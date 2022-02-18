import { Page } from "./strapi-rest-api-page.ts";
import { Gallery } from "./strapi-rest-api-gallery.ts";
import { Home } from "./strapi-rest-api-home.ts";
import { Contact } from "./strapi-rest-api-contact.ts";

export interface SEOOptions {
  template: "home" | "page" | "contact" | "gallery";
  page?: Page;
  gallery?: Gallery;
  home?: Home;
  contact?: Contact;
}
