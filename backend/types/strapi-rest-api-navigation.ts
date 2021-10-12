import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";
import { StrapiRestAPINavigationLink } from "./strapi-rest-api-navigation-link.ts";

export interface StrapiRestAPINavigation extends StrapiRestAPIBase {
  home: string;
  links: StrapiRestAPINavigationLink[];
}
