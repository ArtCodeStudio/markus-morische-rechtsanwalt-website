import { Injectable } from "alosaur/mod.ts";
import { vCard } from "vcard/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIContact } from "../types/strapi-rest-api-contact.ts";

@Injectable()
export class ContactService {
  private strapi = new StrapiService("contact");

  constructor() {}

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

    vcard.photo = {
      url: this.strapi.getRemoteStrapiImageUrl(contact.photo),
      mediaType: contact.photo.mime,
      base64: false,
    };

    return vcard.getFormattedString();
  }
}
