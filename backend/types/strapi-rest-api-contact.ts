import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiImage } from "./strapi-image.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface Contact extends StrapiDataBase {
  email: string;
  phoneLabel: string;
  phoneNumber: string;
  faxLabel: string;
  faxNumber: string;
  firstName: string;
  lastName: string;
  title: string;
  url: string;
  street: string;
  city: string;
  postalCode: string;
  countryRegion: string;
  photo?: {
    data: StrapiImage
  };
}

export type StrapiRestAPIContact = StrapiRestAPIGet<Contact>;

