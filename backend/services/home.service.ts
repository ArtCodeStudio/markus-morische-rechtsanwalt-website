import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIHome } from "../types/strapi-rest-api-home.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class HomeService {
  private strapi = new StrapiService("home");

  constructor() {}

  public async get() {
    try {
      const home = await this.strapi.get<StrapiRestAPIHome>();
      home.content = html(tokens(home.content));
      home.avatar.url = this.strapi.config.url.remote + home.avatar.url;
      return home;
    } catch (error) {
      throw error;
    }
  }
}
