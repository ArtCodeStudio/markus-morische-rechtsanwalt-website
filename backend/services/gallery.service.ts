import { Injectable, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIListGallery, Gallery } from "../types/strapi-rest-api-gallery.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class GalleryService {
  private strapi = new StrapiService("galleries");

  constructor() { }

  public async list() {
    const { data } = await this.strapi.list<StrapiRestAPIListGallery>();
    const galleries = data.map((gallery) => this.transform(gallery.attributes));
    return galleries;
  }

  public async get(slug: string) {
    try {
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListGallery>(slug, {
        query: {
          populate: ["images"]
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

  private transform(gallery: Gallery) {
    if (gallery.images) gallery.images.data.map((data) => {
      data.attributes.url = this.strapi.getRemoteStrapiImageUrl(data.attributes);
      return data;
    })
    if (gallery.content) gallery.content = html(tokens(gallery.content));
    return gallery;
  }
}
