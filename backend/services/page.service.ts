import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIPage } from "../types/index.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class PageService {
  private strapi = new StrapiService("pages");

  constructor() {}

  public list() {
    return this.strapi.list();
  }

  public async get(slug: string) {
    try {
      const page = await this.strapi.getBySlug<StrapiRestAPIPage>(slug);
      page.content = html(tokens(page.content));
      return page;
    } catch (error) {
      throw error;
    }
  }
}
