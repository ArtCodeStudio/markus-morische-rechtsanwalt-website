import { Injectable } from "alosaur/mod.ts";
import { vCard } from "vcard/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { SocialLinkService } from "./sozial-link.service.ts";
import { StrapiRestAPIContact } from "../types/strapi-rest-api-contact.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { StrapiRestAPISocialLink } from "../types/strapi-rest-api-social-link.ts";

@Injectable()
export class ContactService {
  private readonly strapi = new StrapiService("contact");

  constructor(private readonly social: SocialLinkService) {}

  public async get() {
    try {
      const contact = await this.strapi.get<StrapiRestAPIContact>();
      return contact;
    } catch (error) {
      throw error;
    }
  }

  public async getVCard(contact?: StrapiRestAPIContact) {
    contact = contact || await this.get();
    const vcard = new vCard();

    vcard.version = "4.0";

    vcard.email = contact.email;
    vcard.workPhone = contact.phoneNumber;
    vcard.workFax = contact.faxNumber;
    vcard.firstName = contact.firstName;
    vcard.lastName = contact.lastName;
    vcard.title = contact.title;
    vcard.url = contact.url;
    vcard.workAddress = {
      street: contact.street,
      city: contact.city,
      postalCode: contact.postalCode,
      countryRegion: contact.countryRegion,
    };

    // Wait for fix: https://github.com/timpeq/vCards-ts/issues/1
    // vcard.socialUrls = await this.getSocialUrls();

    vcard.photo = {
      url: this.strapi.getRemoteStrapiImageUrl(contact.photo),
      mediaType: this.getImageType(contact.photo),
      base64: false,
    };

    return vcard.getFormattedString();
  }

  public getImageType(image: StrapiImage) {
    const type = image.mime.replace("image/", "");
    return type;
  }

  public async getSocialUrls(socialLinks?: StrapiRestAPISocialLink[]) {
    socialLinks = socialLinks || await this.social.list();
    const socialUrls = new Map<string, string>();
    for (const socialLink of socialLinks) {
      const platform = socialLink.icon.replaceAll("social_", "").replaceAll(
        "_circle",
        "",
      ).replaceAll("_square", "").replaceAll(".svg", "");
      socialUrls.set(platform, socialLink.url);
    }

    return socialUrls;
  }
}
