import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";

export interface StrapiRestAPIPage extends StrapiRestAPIBase {
  slug: string;
  name: string;
  content: string;
}
