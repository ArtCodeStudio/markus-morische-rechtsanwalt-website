import { Injectable } from "alosaur/mod.ts";
import { SEOOptions } from "../types/seo-options.ts";
import { SEO } from "../types/seo.ts";

@Injectable()
export class SeoService {
  constructor() { }

  public get(options: SEOOptions) {
    const seo: SEO = {
      canonical: "https://markusmorische.de",
      title: "Markus Morische",
      type: "website",
      locale: "de_DE",
      // deno-lint-ignore camelcase
      site_name: "Markus Morische - Fachanwalt für Erbrecht",
      keywords: "Markus Morische, Fachanwalt, Erbrecht, Cuxhaven",
    };

    if (options.template === "page" && options.page) {
      seo.canonical = seo.canonical + "/" + options.page.slug;
      seo.title += " - " + options.page.name;
      if (options.page.content) seo.description = this.cutStr(this.stripHtml(options.page.content));
    }

    if (options.template === "contact") {
      seo.canonical = seo.canonical + "/contact";
      seo.title += " - Kontakt";
      // TODO: if (options.page.content) seo.description = this.cutStr(this.stripHtml(options.page.content));
    }

    if (options.template === "home" && options.home) {
      seo.title = options.home.title + " - " + options.home.subtitle;
      if (options.home.avatar?.data) {
        seo.image = {
          url: options.home.avatar.data.attributes.url,
          secure_url: options.home.avatar.data.attributes.url,
          type: options.home.avatar.data.attributes.mime,
          width: options.home.avatar.data.attributes.width,
          height: options.home.avatar.data.attributes.height,
          alt: options.home.avatar.data.attributes.alternativeText,
        };
      }
      seo.description = this.cutStr(this.stripHtml(options.home.content));
    }

    return seo;
  }

  public stripHtml(str: string) {
    return str.replace(/(<([^>]+)>)/ig, "");
  }

  public cutStr(str: string, length = 170) {
    if (str.length > length) {
      str = str.substring(0, length - 3) + "...";
    }
    return str;
  }
}
