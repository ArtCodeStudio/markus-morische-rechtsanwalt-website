import { Page } from "./strapi-rest-api-page.ts";
import { Gallery } from "./strapi-rest-api-gallery.ts";
import { Home } from "./strapi-rest-api-home.ts";
import { Office } from "./strapi-rest-api-office.ts";

export interface SEOOptions {
  template: "home" | "page" | "contact" | "gallery";
  page?: Page;
  gallery?: Gallery;
  home?: Home;
  offices?: Office[];
}
