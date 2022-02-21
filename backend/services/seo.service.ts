import { Singleton } from "alosaur/mod.ts";
import { SEOOptions } from "../types/seo-options.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { SEO } from "../types/seo.ts";
import { OpenGraph } from "../types/open-graph.ts";
// See https://github.com/google/schema-dts
import * as Schema from "../types/schema.ts";
import { StrapiService } from "./strapi.service.ts";

@Singleton()
export class SeoService {

  private readonly strapi = new StrapiService("");

  private canonical = {
    host: Deno.env.get("CANONICAL_HOST") || "https://markusmorische.de",
  }

  constructor() { }

  public get(options: SEOOptions) {

    const seo: SEO = this.initSEO(options);

    const og: OpenGraph = this.initOpenGraph(options);

    let schema: Schema.WithContext<Schema.Thing> | null = null;

    switch (options.template) {
      case "page":
        this.setSEOPage(seo, options);
        this.setOCPage(og, options);
        schema = this.getSchemaPage(seo, options);
        break;
      case "contact":
        this.setSEOContact(seo, options);
        this.setOCContact(og, options);
        schema = this.getSchemaContact(options);
        break;
      case "gallery":
        this.setSEOGallery(seo, options);
        this.setOCGallery(og, options);
        // TODO: https://schema.org/ArtGallery
        schema = this.getSchemaPage(seo, options);
        break;
      case "home":
        this.setSEOHome(seo, options);
        this.setOCHome(og, options);
        schema = this.getSchemaPage(seo, options);
        break;
      default:
        break;
    }

    return {
      seo,
      og,
      schema,
    };
  }

  initSEO(options: SEOOptions) {
    const data = options.contact?.seo || options.page?.seo || options.home?.seo || options.gallery?.seo;
    const seo: SEO = {
      canonical: this.canonical.host,
      description: "",
      title: "Markus Morische",
      locale: "de_DE",
    };
    if (!data) {
      return seo;
    }
    if (data.description) seo.description = this.parseSEODescription(data.description);
    if (data.title) seo.title = data.title;
    return seo;
  }

  initOpenGraph(options: SEOOptions) {
    const data = options.contact?.openGraph || options.page?.openGraph || options.home?.openGraph || options.gallery?.openGraph;
    const og: OpenGraph = {
      canonical: this.canonical.host,
      description: "",
      title: "Markus Morische",
      type: "website",
      locale: "de_DE",
      site_name: "Markus Morische - Fachanwalt für Erbrecht",
      audios: [],
      images: [],
      videos: [],
    }
    if (!data) {
      return og;
    }
    if (data.description) og.description = this.parseOCDescription(data.description);
    if (data.title) og.title = data.title;
    if (data.type) og.type = data.type.replaceAll('_', '.') as OpenGraph['type'];
    // if (data?.locale) og.locale = data.locale;
    if (data.site_name) og.site_name = data.site_name;

    // images
    if (data.images?.data) {
      for (const image of data.images.data) {
        if (image.attributes) {
          og.images.push(this.getOCImage(image.attributes));
        }
      }
    }

    return og;
  }

  // FOR TEMPLATES

  private setSEOPage(seo: SEO, options: SEOOptions) {
    if (options.template === "page" && options.page) {
      seo.canonical = seo.canonical + "/" + options.page.slug;

      // title
      if (options.page?.seo?.title) {
        seo.title = options.page.seo.title;
      } else if (options.page?.openGraph?.title) {
        seo.title = options.page.openGraph.title;
      } else {
        seo.title += " - " + options.page.name;
      }

      // description
      if (options.page?.seo?.description) {
        seo.description = this.parseSEODescription(options.page.seo.description);
      } else if (options.page?.openGraph?.description) {
        seo.description = this.parseSEODescription(options.page.openGraph.description);
      } else if (options.page?.content) {
        seo.description = this.parseSEODescription(options.page.content);
      }
    }
  }

  private setOCPage(og: OpenGraph, options: SEOOptions) {
    if (options.template === "page" && options.page) {
      og.canonical = og.canonical + "/" + options.page.slug;
      og.title += " - " + options.page.name;

      // title
      if (options.page?.openGraph?.title) {
        og.title = options.page.openGraph.title;
      } else if (options.page?.seo?.title) {
        og.title = options.page.seo.title;
      } else {
        og.title += " - " + options.page.name;
      }

      // images
      if (!og.images.length && options.page?.image?.data) {
        og.images.push(this.getOCImage(options.page.image.data.attributes));
      }

      // description
      if (options.page?.openGraph?.description) {
        og.description = this.parseOCDescription(options.page.openGraph.description);
      } else if (options.page?.seo?.description) {
        og.description = this.parseOCDescription(options.page.seo.description);
      } else if (options.page?.content) {
        og.description = this.parseOCDescription(options.page.content);
      }
    }
  }

  private getSchemaPage(seo: SEO, options: SEOOptions) {
    if (options.template === "page" && options.page) {
      // https://schema.org/AboutPage
      if (options.page.slug === 'ueber-mich' || options.page.slug === 'about' || options.page.slug === 'ueber') {
        const about: Schema.WithContext<Schema.AboutPage> = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          inLanguage: "de-DE",
          url: seo.canonical,
          description: seo.description,
          name: seo.title,
        };
        return about;
      } else {
        const page: Schema.WithContext<Schema.WebPage> = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          inLanguage: "de-DE",
          url: seo.canonical,
          description: seo.description,
          name: seo.title,
        };
        return page;
      }
    }
    return null;
  }

  private setSEOContact(seo: SEO, options: SEOOptions) {
    if (options.template === "contact") {
      seo.canonical = seo.canonical + "/contact";

      // title
      if (options.contact?.seo?.title) {
        seo.title = options.contact.seo.title;
      } else if (options.contact?.openGraph?.title) {
        seo.title = options.contact.openGraph.title;
      } else {
        seo.title += " - " + options.contact?.title || "Kontakt";
      }

      // description
      if (options.contact?.seo?.description) {
        seo.description = this.parseSEODescription(options.contact.seo.description);
      } else if (options.contact?.openGraph?.description) {
        seo.description = this.parseSEODescription(options.contact.openGraph.description);
      } else if (options.contact?.content) {
        seo.description = this.parseSEODescription(options.contact.content);
      }
    }
  }

  private setOCContact(og: OpenGraph, options: SEOOptions) {
    if (options.template === "contact") {
      og.canonical = og.canonical + "/contact";

      // title
      if (options.contact?.openGraph?.title) {
        og.title = options.contact.openGraph.title;
      } else if (options.contact?.seo?.title) {
        og.title = options.contact.seo.title;
      } else {
        og.title += " - " + options.contact?.title || "Kontakt";
      }

      // images
      if (!og.images.length && options.contact?.offices?.data) {
        for (const office of options.contact.offices.data) {
          if (office.attributes.map.data.attributes) {
            og.images.push(this.getOCImage(office.attributes.map.data.attributes));
          }
        }
      }

      // description
      if (options.contact?.openGraph?.description) {
        og.description = this.parseOCDescription(options.contact.openGraph.description);
      } else if (options.contact?.seo?.description) {
        og.description = this.parseOCDescription(options.contact.seo.description);
      } else if (options.contact?.content) {
        og.description = this.parseOCDescription(options.contact.content);
      }
    }
  }

  private getSchemaContact(options: SEOOptions) {
    // person
    if (options.contact?.offices?.data) {
      for (const _office of options.contact.offices.data) {
        const office = _office.attributes;
        const person: Schema.WithContext<Schema.Person> = {
          "@context": "https://schema.org",
          "@type": "Person",
          address: {
            "@type": "PostalAddress",
            addressLocality: office.city,
            addressRegion: office.countryRegion,
            postalCode: office.postalCode,
            streetAddress: office.street,
          },
          email: office.email,
          image: this.strapi.getRemoteStrapiImageUrl(office.photo?.data?.attributes || office.map?.data?.attributes),
          jobTitle: office.title,
          name: `${office.firstName} ${office.lastName}`,
          familyName: office.lastName,
          givenName: office.firstName,
          telephone: office.phoneNumber,
          faxNumber: office.faxNumber,
          url: office.url
        }
        return person;
      }
    }
    return null;
  }

  private setSEOGallery(seo: SEO, options: SEOOptions) {
    if (options.template === "gallery" && options.gallery) {
      seo.canonical = seo.canonical + "/gallery" + options.gallery.slug;

      // title
      if (options.gallery?.seo?.title) {
        seo.title = options.gallery.seo.title;
      } else if (options.gallery?.openGraph?.title) {
        seo.title = options.gallery.openGraph.title;
      } else {
        seo.title += " - " + options.gallery.title || "Gallery";
      }

      // description
      if (options.gallery?.seo?.description) {
        seo.description = this.parseSEODescription(options.gallery.seo.description);
      } else if (options.gallery?.openGraph?.description) {
        seo.description = this.parseSEODescription(options.gallery.openGraph.description);
      } else if (options.gallery?.content) {
        seo.description = this.parseSEODescription(options.gallery.content);
      }
    }
  }

  private setOCGallery(og: OpenGraph, options: SEOOptions) {
    if (options.template === "gallery" && options.gallery) {
      og.canonical = og.canonical + "/gallery" + options.gallery.slug;

      // title
      if (options.gallery?.openGraph?.title) {
        og.title = options.gallery.openGraph.title;
      } else if (options.gallery?.seo?.title) {
        og.title = options.gallery.seo.title;
      } else {
        og.title += " - " + options.gallery?.title || "Gallery";
      }

      // images
      if (!og.images.length && options.gallery.images?.data) {
        for (const image of options.gallery.images.data) {
          if (image.attributes) {
            og.images.push(this.getOCImage(image.attributes));
          }
        }
      }

      // description
      if (options.gallery.openGraph?.description) {
        og.description = this.parseOCDescription(options.gallery.openGraph.description);
      } else if (options.gallery.seo?.description) {
        og.description = this.parseOCDescription(options.gallery.seo.description);
      } else if (options.gallery.content) {
        og.description = this.parseOCDescription(options.gallery.content);
      }
    }
  }

  private setSEOHome(seo: SEO, options: SEOOptions) {
    if (options.template === "home" && options.home) {

      if (options.home?.seo?.title) {
        seo.title = options.home.seo.title;
      } else if (options.home?.openGraph?.title) {
        seo.title = options.home.openGraph.title;
      } else {
        seo.title = options.home.title + " - " + options.home.subtitle;
      }

      // description
      if (options.home?.seo?.description) {
        seo.description = this.parseSEODescription(options.home.seo.description);
      } else if (options.home?.openGraph?.description) {
        seo.description = this.parseSEODescription(options.home.openGraph.description);
      } else if (options.home?.content) {
        seo.description = this.parseSEODescription(options.home.content);
      }
    }
  }

  private setOCHome(og: OpenGraph, options: SEOOptions) {
    if (options.template === "home" && options.home) {

      // title
      if (options.home?.openGraph?.title) {
        og.title = options.home.openGraph.title;
      } else if (options.home?.seo?.title) {
        og.title = options.home.seo.title;
      } else {
        og.title = options.home.title + " - " + options.home.subtitle;
      }

      // images
      if (!og.images.length && options.home.avatar?.data) {
        og.images.push(this.getOCImage(options.home.avatar.data.attributes));
      }

      // description
      if (options.home.openGraph?.description) {
        og.description = this.parseOCDescription(options.home.openGraph.description);
      } else if (options.home.seo?.description) {
        og.description = this.parseOCDescription(options.home.seo.description);
      } else if (options.home.content) {
        og.description = this.parseOCDescription(options.home.content);
      }
    }
  }

  // HELPER

  private parseSEODescription(content: string) {
    return this.cutStr(this.stripHtml(content || ""));
  }

  private parseOCDescription(content: string) {
    return this.stripHtml(content || "");
  }

  private getOCImage(image: StrapiImage) {
    const url = this.strapi.getRemoteStrapiImageUrl(image);
    return {
      url: url,
      secure_url: url,
      type: image.mime,
      width: image.width,
      height: image.height,
      alt: image.alternativeText,
    }
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
}
