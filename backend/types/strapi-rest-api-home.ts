import { StrapiImage } from "./strapi-image.ts";
import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";
import { SEO } from "./strapi-rest-api-seo.ts";
import { OpenGraph } from "./strapi-rest-api-open-graph.ts";

export interface Home extends StrapiDataBase {
  title: string;
  subtitle: string;
  content: string;
  avatar?: StrapiRestAPIGet<StrapiImage>;
  seo: SEO | null;
  openGraph: OpenGraph | null;
}

export type StrapiRestAPIGetHome = StrapiRestAPIGet<Home>;
