import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface Page extends StrapiDataBase {
  slug: string;
  name: string;
  content: string;
}

export type StrapiRestAPIGetPage = StrapiRestAPIGet<Page>;
export type StrapiRestAPIListPage = StrapiRestAPIList<Page>;