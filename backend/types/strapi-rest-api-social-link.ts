import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";

export interface StrapiRestAPISocialLink extends StrapiRestAPIBase {
  icon: string;
  url: string;
  active: boolean;
}
