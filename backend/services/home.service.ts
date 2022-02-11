import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIHome } from "../types/strapi-rest-api-home.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class HomeService {
  private strapi = new StrapiService("home");

  constructor() { }

  public async get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPIHome>({ populates: ['avatar'] });
      const home = data.attributes;
      if (home.content) home.content = html(tokens(home.content));
      if (home.avatar?.data) home.avatar.data.attributes.url = this.strapi.config.url.remote + home.avatar.data.attributes.url;
      return home;
    } catch (error) {
      throw error;
    }
  }
}
