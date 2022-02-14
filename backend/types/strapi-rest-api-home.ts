import { StrapiImage } from "./strapi-image.ts";
import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface Home extends StrapiDataBase {
  title: string;
  subtitle: string;
  content: string;
  avatar?: StrapiRestAPIGet<StrapiImage>;
}

export type StrapiRestAPIGetHome = StrapiRestAPIGet<Home>;
