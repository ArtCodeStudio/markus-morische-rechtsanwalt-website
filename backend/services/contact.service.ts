import { Injectable } from "alosaur/mod.ts";
import { vCard } from "vcard/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { SocialLinkService } from "./sozial-link.service.ts";
import { StrapiRestAPIContact, Contact } from "../types/strapi-rest-api-contact.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { SocialLink } from "../types/strapi-rest-api-social-link.ts";

@Injectable()
export class ContactService {
  private readonly strapi = new StrapiService("contact");

  constructor(private readonly social: SocialLinkService) { }

  public async get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPIContact>();
      const contact = data.attributes;
      return contact;
    } catch (error) {
      throw error;
    }
  }

  public async getVCard(contact?: Contact) {
    contact ||= await this.get();
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

    vcard.socialUrls = await this.getSocialUrls();

    if (contact.photo) {
      vcard.photo = {
        url: this.strapi.getRemoteStrapiImageUrl(contact.photo.data),
        mediaType: this.getImageType(contact.photo.data),
        base64: false,
      };
    }

    return vcard.getFormattedString();
  }

  public getImageType(image: StrapiImage) {
    const type = image.mime.replace("image/", "");
    return type;
  }

  public async getSocialUrls(socialLinks?: SocialLink[]) {
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
