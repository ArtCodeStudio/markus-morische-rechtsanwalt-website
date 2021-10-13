import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";
import { StrapiImage } from "./strapi-image.ts";

export interface StrapiRestAPIContact extends StrapiRestAPIBase {
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
  photo: StrapiImage;
}
