import { StrapiRestAPIPage } from "./strapi-rest-api-page.ts";
import { StrapiRestAPIHome } from "./strapi-rest-api-home.ts";

export interface SEOOptions {
  template: "home" | "page";
  page?: StrapiRestAPIPage;
  home?: StrapiRestAPIHome;
}
