import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";
import { Office } from "./strapi-rest-api-office.ts";

export interface Contact extends StrapiDataBase {
  title: string;
  content: string | null;
  offices: StrapiRestAPIList<Office>;
}

export type StrapiRestAPIGetContact = StrapiRestAPIGet<Contact>;