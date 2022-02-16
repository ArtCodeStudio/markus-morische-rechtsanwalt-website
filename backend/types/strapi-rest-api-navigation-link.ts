import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface NavigationLink extends StrapiDataBase {
  label: string;
  page?: StrapiRestAPIGet<{ slug: string }>;
  gallery?: StrapiRestAPIGet<{ slug: string }>;
  url: string;
}

export type StrapiRestAPIGetNavigationLink = StrapiRestAPIGet<NavigationLink>;
export type StrapiRestAPIListNavigationLink = StrapiRestAPIList<NavigationLink>;