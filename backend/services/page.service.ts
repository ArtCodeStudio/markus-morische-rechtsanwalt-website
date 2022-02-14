import { Injectable, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIListPage } from "../types/strapi-rest-api-page.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class PageService {
  private strapi = new StrapiService("pages");

  constructor() { }

  public async list() {
    const { data } = await this.strapi.list<StrapiRestAPIListPage>();
    const pages = data.map((page) => page.attributes);
    return pages;
  }

  public async get(slug: string) {
    try {
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListPage>(slug);
      if (!Array.isArray(data) || !data.length) {
        throw new NotFoundError(this.strapi.errorMessages.notFound);
      }
      const page = data[0].attributes;
      if (page.content) page.content = html(tokens(page.content));
      return page;
    } catch (error) {
      throw error;
    }
  }
}
