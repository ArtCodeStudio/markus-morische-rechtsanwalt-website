import { Singleton } from "alosaur/mod.ts";
import { SEOOptions } from "../types/seo-options.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { SEO } from "../types/seo.ts";
import { SEOSchema } from "../types/seo-schema.ts";

@Singleton()
export class SeoService {
  constructor() { }

  private seo: SEO = {
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

  private schema: SEOSchema = {};

  public get(options: SEOOptions) {

    switch (options.template) {
      case "page":
        this.setPage(options);
        break;
      case "contact":
        this.setContact(options);
        break;
      case "gallery":
        this.setGallery(options);
        break;
      case "home":
        this.setHome(options);
        break;
      default:
        break;
    }

    return this.seo;
  }

  private stripHtml(str: string) {
    return str.replace(/(<([^>]+)>)/ig, "");
  }

  private cutStr(str: string, length = 170) {
    if (str.length > length) {
      str = str.substring(0, length - 3) + "...";
    }
    return str;
  }

  private getDescription(content: string) {
    return this.cutStr(this.stripHtml(content || ""))
  }

  private getImage(image: StrapiImage) {
    return {
      url: image.url,
      secure_url: image.url,
      type: image.mime,
      width: image.width,
      height: image.height,
      alt: image.alternativeText,
    }
  }

  private setPage(options: SEOOptions) {
    if (options.template === "page" && options.page) {
      this.seo.canonical = this.seo.canonical + "/" + options.page.slug;
      this.seo.title += " - " + options.page.name;

      if (options.page.image?.data) {
        this.seo.images.push(this.getImage(options.page.image.data.attributes));
      }

      if (options.page.content) this.seo.description = this.getDescription(options.page.content);
    }
  }

  private setContact(options: SEOOptions) {
    if (options.template === "contact") {
      this.seo.canonical = this.seo.canonical + "/contact";
      this.seo.title += " - " + options.contact?.title || "Kontakt";
      if (options.contact) {
        if (options.contact.offices?.data) {
          for (const office of options.contact.offices.data) {
            if (office.attributes.map.data.attributes) {
              this.seo.images.push(this.getImage(office.attributes.map.data.attributes));
            }
          }
        }

        if (options.contact.content) this.seo.description = this.getDescription(options.contact.content);
      }
    }
  }

  private setGallery(options: SEOOptions) {
    if (options.template === "gallery" && options.gallery) {
      this.seo.canonical = this.seo.canonical + "/gallery" + options.gallery.slug;
      this.seo.title += " - " + options.gallery.title || "Gallery";

      if (options.gallery.images?.data) {
        for (const image of options.gallery.images.data) {
          if (image.attributes) {
            this.seo.images.push(this.getImage(image.attributes));
          }
        }
      }

      this.seo.description = this.getDescription(options.gallery.content);
    }
  }

  private setHome(options: SEOOptions) {
    if (options.template === "home" && options.home) {
      this.seo.title = options.home.title + " - " + options.home.subtitle;

      if (options.home.avatar?.data) {
        this.seo.images.push(this.getImage(options.home.avatar.data.attributes));
      }

      this.seo.description = this.getDescription(options.home.content);
    }
  }
}
