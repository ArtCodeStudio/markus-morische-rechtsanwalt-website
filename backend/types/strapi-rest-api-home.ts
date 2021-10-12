import { StrapiImage } from "./strapi-image.ts";

export interface StrapiRestAPIHome {
  title: string;
  subtitle: string;
  content: string;
  avatar: StrapiImage;
}
