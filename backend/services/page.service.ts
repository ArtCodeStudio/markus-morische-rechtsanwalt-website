import { Singleton, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIListPage, Page } from "../types/strapi-rest-api-page.ts";

@Singleton()
export class PageService {
  private strapi = new StrapiService("pages");

  constructor(private readonly cache: CacheService<string, Page[]>) { }

  public async _list() {
    const { data } = await this.strapi.list<StrapiRestAPIListPage>();
    const pages = data.map((page) => this.transform(page.attributes));
    return pages;
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
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListPage>(slug, {
        query: {
          populate: ["image"]
        }
      });
      if (!Array.isArray(data) || !data.length) {
        throw new NotFoundError(this.strapi.errorMessages.notFound);
      }
      const page = data[0].attributes;
      return this.transform(page);
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

  private transform(page: Page) {
    if (page.content) page.content = this.strapi.renderMarkdown(page.content);
    if (page.image?.data?.attributes?.url) page.image.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(page.image.data.attributes)
    return page;
  }
}
