import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIListNavigationLink } from "./strapi-rest-api-navigation-link.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface Navigation extends StrapiDataBase {
  home: string;
  links: StrapiRestAPIListNavigationLink;
}

export type StrapiRestAPIGetNavigation = StrapiRestAPIGet<Navigation>;