import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";
import { StrapiImage } from "./strapi-image.ts";

export interface Gallery extends StrapiDataBase {
    slug: string;
    title: string;
    content: string;
    images: StrapiRestAPIList<StrapiImage>
}

export type StrapiRestAPIGetGallery = StrapiRestAPIGet<Gallery>;
export type StrapiRestAPIListGallery = StrapiRestAPIList<Gallery>;