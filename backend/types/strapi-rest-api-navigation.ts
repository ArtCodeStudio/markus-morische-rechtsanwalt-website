import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { NavigationLink } from "./strapi-rest-api-navigation-link.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface Navigation extends StrapiDataBase {
  links: NavigationLink[];
}

export type StrapiRestAPIGetNavigation = StrapiRestAPIGet<Navigation>;