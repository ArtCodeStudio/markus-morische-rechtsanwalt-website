import { StrapiImage } from "./strapi-image.ts";
import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";

export interface StrapiRestAPIHome extends StrapiRestAPIBase {
  title: string;
  subtitle: string;
  content: string;
  avatar: StrapiImage;
}
