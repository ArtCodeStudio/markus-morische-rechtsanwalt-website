import { Singleton, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIListOffice, Office } from "../types/strapi-rest-api-office.ts";

@Singleton()
export class OfficeService {
  private strapi = new StrapiService("offices");

  constructor(private readonly cache: CacheService<string, Office[]>) { }

  public async _list() {
    const { data } = await this.strapi.list<StrapiRestAPIListOffice>({
      query: {
        populate: [
          "photo", "map"
        ]
      }
    });
    if (!data) {
      return [];
    }
    const offices = data.map((page) => this.transform(page.attributes));
    return Array.from(offices);
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
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListOffice>(slug, {
        query: {
          populate: [
            "photo", "map"
          ]
        }
      });
      if (!Array.isArray(data) || !data.length) {
        throw new NotFoundError(this.strapi.errorMessages.notFound);
      }
      const office = data[0].attributes;
      this.transform(office);
      return office;
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

  public transform(office: Office) {
    if (office.photo?.data?.attributes?.url) office.photo.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(office.photo.data.attributes);
    if (office.map?.data?.attributes?.url) office.map.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(office.map.data.attributes);
    return office;
  }
}
