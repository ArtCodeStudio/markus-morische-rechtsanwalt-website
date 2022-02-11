import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface SocialLink extends StrapiDataBase {
  icon: string;
  url: string;
  active: boolean;
}

export type StrapiRestAPIGetSocialLink = StrapiRestAPIGet<SocialLink>;
export type StrapiRestAPIListSocialLink = StrapiRestAPIList<SocialLink>;