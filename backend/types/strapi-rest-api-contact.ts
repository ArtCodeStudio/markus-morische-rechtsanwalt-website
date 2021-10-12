import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";

export interface StrapiRestAPIContact extends StrapiRestAPIBase {
  email: string;
  phoneLabel: string;
  phoneNumber: string;
  faxLabel: string;
  faxNumber: string;
}
