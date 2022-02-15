import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";
import { StrapiImage } from "./strapi-image.ts";

export interface Office extends StrapiDataBase {
  slug: string;
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
  photo?: StrapiRestAPIGet<StrapiImage>;
  map: StrapiRestAPIGet<StrapiImage>;
}

export type StrapiRestAPIGetOffice = StrapiRestAPIGet<Office>;
export type StrapiRestAPIListOffice = StrapiRestAPIList<Office>;