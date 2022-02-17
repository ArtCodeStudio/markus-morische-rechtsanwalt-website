import { Injectable } from "alosaur/mod.ts";
import { SEOOptions } from "../types/seo-options.ts";
import { StrapiImage } from "../types/strapi-image.ts";
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
      // Deprecated
      // keywords: "Markus Morische, Fachanwalt, Erbrecht, Cuxhaven",
      audios: [],
      images: [],
      videos: [],
    };

    if (options.template === "page" && options.page) {
      seo.canonical = seo.canonical + "/" + options.page.slug;
      seo.title += " - " + options.page.name;

      if (options.page.image?.data) {
        seo.images.push(this.getImage(options.page.image.data.attributes));
      }

      if (options.page.content) seo.description = this.getDescription(options.page.content);
    }

    if (options.template === "contact") {
      seo.canonical = seo.canonical + "/contact";
      seo.title += " - Kontakt";

      if (options.offices) {
        for (const office of options.offices) {
          if (office.map.data.attributes) {
            seo.images.push(this.getImage(office.map.data.attributes));
          }
        }
      }

      // TODO: if (options.page.content) seo.description = this.getDescription(options.page.content);
    }

    if (options.template === "gallery" && options.gallery) {
      seo.canonical = seo.canonical + "/gallery" + options.gallery.slug;
      seo.title += " - " + options.gallery.title || "Gallery";

      if (options.gallery.images?.data) {
        for (const image of options.gallery.images.data) {
          if (image.attributes) {
            seo.images.push(this.getImage(image.attributes));
          }
        }
      }

      seo.description = this.getDescription(options.gallery.content);
    }

    if (options.template === "home" && options.home) {
      seo.title = options.home.title + " - " + options.home.subtitle;

      if (options.home.avatar?.data) {
        seo.images.push(this.getImage(options.home.avatar.data.attributes));
      }

      seo.description = this.getDescription(options.home.content);
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

  public getDescription(content: string) {
    return this.cutStr(this.stripHtml(content || ""))
  }

  public getImage(image: StrapiImage) {
    return {
      url: image.url,
      secure_url: image.url,
      type: image.mime,
      width: image.width,
      height: image.height,
      alt: image.alternativeText,
    }
  }
}
