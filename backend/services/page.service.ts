import { Injectable, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIListPage, Page } from "../types/strapi-rest-api-page.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class PageService {
  private strapi = new StrapiService("pages");

  constructor() { }

  public async list() {
    const { data } = await this.strapi.list<StrapiRestAPIListPage>();
    const pages = data.map((page) => this.transform(page.attributes));
    return pages;
  }

  public async get(slug: string) {
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

  private transform(page: Page) {
    if (page.content) page.content = html(tokens(page.content));
    if (page.image?.data?.attributes?.url) page.image.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(page.image.data.attributes)
    return page;
  }
}
