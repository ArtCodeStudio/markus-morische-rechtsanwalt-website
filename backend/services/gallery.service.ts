import { Singleton, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIListGallery, Gallery } from "../types/strapi-rest-api-gallery.ts";

@Singleton()
export class GalleryService {
  private readonly strapi = new StrapiService("galleries");

  constructor(private readonly cache: CacheService<string, Gallery[]>) { }

  private async _list() {
    const { data } = await this.strapi.list<StrapiRestAPIListGallery>();
    if (!data) {
      return [];
    }
    const galleries = data.map((gallery) => this.transform(gallery.attributes));
    return galleries;
  }

  public async list() {
    const key = this.strapi.baseUrl.pathname;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const galleries = await this._list();
    this.cache.set(key, galleries);
    return this.cache.get(key);
  }

  public async _get(slug: string) {
    try {
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListGallery>(slug, {
        query: {
          populate: ["images", "seo", "openGraph", "openGraph.images"]
        }
      });
      if (!Array.isArray(data) || !data.length) {
        throw new NotFoundError(this.strapi.errorMessages.notFound);
      }
      const gallery = data[0].attributes;
      return this.transform(gallery);
    } catch (error) {
      throw error;
    }
  }

  public async get(slug: string) {
    const key = `${this.strapi.baseUrl.pathname}/${slug}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)[0];
    }

    const gallery = await this._get(slug);
    this.cache.set(key, [gallery]);
    return this.cache.get(key)[0];
  }

  private transform(gallery: Gallery) {
    if (gallery.images.data) gallery.images.data.map((data) => {
      data.attributes.url = this.strapi.getRemoteStrapiImageUrl(data.attributes);
      return data;
    })
    if (gallery.content) gallery.content = this.strapi.renderMarkdown(gallery.content);
    console.debug("gallery");
    console.dir(gallery);
    return gallery;
  }
}
