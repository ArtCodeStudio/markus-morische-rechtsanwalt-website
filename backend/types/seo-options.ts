import { Page } from "./strapi-rest-api-page.ts";
import { Home } from "./strapi-rest-api-home.ts";
import { Office } from "./strapi-rest-api-office.ts";

export interface SEOOptions {
  template: "home" | "page" | "contact";
  page?: Page;
  home?: Home;
  offices?: Office[];
}
