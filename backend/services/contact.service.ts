import { Injectable } from "alosaur/mod.ts";
import { vCard } from "vcard/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { SocialLinkService } from "./sozial-link.service.ts";
import { OfficeService } from "./office.service.ts";
import { SocialLink } from "../types/strapi-rest-api-social-link.ts";

@Injectable()
export class ContactService {
  private readonly strapi = new StrapiService("contact");

  constructor(private readonly office: OfficeService, private readonly social: SocialLinkService) { }

  public async getVCard(slug: string) {
    const office = await this.office.get(slug);
    const vcard = new vCard();

    vcard.version = "4.0";

    vcard.email = office.email;
    vcard.workPhone = office.phoneNumber;
    vcard.workFax = office.faxNumber;
    vcard.firstName = office.firstName;
    vcard.lastName = office.lastName;
    vcard.title = office.title;
    vcard.url = office.url;
    vcard.workAddress = {
      street: office.street,
      city: office.city,
      postalCode: office.postalCode,
      countryRegion: office.countryRegion,
    };

    vcard.socialUrls = await this.getSocialUrls();

    if (office.photo?.data?.attributes) {
      vcard.photo = {
        url: this.strapi.getRemoteStrapiImageUrl(office.photo.data.attributes),
        mediaType: this.strapi.getImageType(office.photo.data.attributes),
        base64: false,
      };
    }

    return vcard.getFormattedString();
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
