import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";
import { StrapiImage } from "./strapi-image.ts";
import { SEO } from "./strapi-rest-api-seo.ts";
import { OpenGraph } from "./strapi-rest-api-open-graph.ts";

export interface Gallery extends StrapiDataBase {
    slug: string;
    title: string;
    content?: string | null;
    images: StrapiRestAPIList<StrapiImage>
    seo: SEO | null;
    openGraph: OpenGraph | null;
}

export type StrapiRestAPIGetGallery = StrapiRestAPIGet<Gallery>;
export type StrapiRestAPIListGallery = StrapiRestAPIList<Gallery>;