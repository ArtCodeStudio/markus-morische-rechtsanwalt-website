import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";
import { StrapiRestAPIPage } from "./strapi-rest-api-page.ts";

export interface StrapiRestAPINavigationLink extends StrapiRestAPIBase {
  label: string;
  page: StrapiRestAPIPage;
}
