import { Page } from "./strapi-rest-api-page.ts";
import { Home } from "./strapi-rest-api-home.ts";

export interface SEOOptions {
  template: "home" | "page";
  page?: Page;
  home?: Home;
}
