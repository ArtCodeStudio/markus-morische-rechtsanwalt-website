import { Singleton } from "alosaur/mod.ts";
import { vCard } from "vcard/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { SocialLinkService } from "./sozial-link.service.ts";
import { OfficeService } from "./office.service.ts";
import { CacheService } from "./cache.service.ts";
import { SocialLink } from "../types/strapi-rest-api-social-link.ts";
import { StrapiRestAPIGetContact, Contact } from "../types/strapi-rest-api-contact.ts";

/**
 * @see https://deno.land/x/local_cache@1.0
 */
@Singleton()
export class ContactService {
  private readonly strapi = new StrapiService("contact");

  constructor(private readonly office: OfficeService, private readonly social: SocialLinkService, private readonly cache: CacheService<string, Contact>) { }

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

  public async _get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPIGetContact>({
        query: {
          populate: ["seo", "openGraph", "openGraph.images", "offices", "offices.map"],
        }
      });
      const page = data.attributes;
      return this.transform(page);
    } catch (error) {
      throw error;
    }
  }

  public async get() {
    const key = `${this.strapi.baseUrl.pathname}`;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const contact = await this._get();
    this.cache.set(key, contact);
    return this.cache.get(key);
  }

  private transform(contact: Contact) {
    if (contact.content) contact.content = this.strapi.renderMarkdown(contact.content);

    if (contact.offices.data) contact.offices.data = contact.offices.data.map((officeObj) => {
      officeObj.attributes = this.office.transform(officeObj.attributes);
      return officeObj;
    });
    return contact;
  }

  public async getSocialUrls(socialLinks?: SocialLink[]) {
    socialLinks = socialLinks || await this.social.list();
    const socialUrls = new Map<string, string>();
    for (const socialLink of socialLinks) {
      socialUrls.set(socialLink.platform || "unknown", socialLink.url);
    }

    return socialUrls;
  }
}
