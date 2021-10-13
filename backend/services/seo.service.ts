import { Injectable } from "alosaur/mod.ts";
import { SEOOptions } from "../types/seo-options.ts";
import { SEO } from "../types/seo.ts";

@Injectable()
export class SeoService {
  constructor() {}

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
      seo.description = this.cutStr(this.stripHtml(options.page.content));
    }

    if (options.template === "home" && options.home) {
      seo.title = options.home.title + " - " + options.home.subtitle;
      if (options.home.avatar) {
        seo.image = {
          url: options.home.avatar.url,
          secure_url: options.home.avatar.url,
          type: options.home.avatar.mime,
          width: options.home.avatar.width,
          height: options.home.avatar.height,
          alt: options.home.avatar.alternativeText,
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
