import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIGetHome } from "../types/strapi-rest-api-home.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class HomeService {
  private strapi = new StrapiService("home");

  constructor() { }

  public async get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPIGetHome>({ populates: ['avatar'] });
      const home = data.attributes;
      if (home.content) home.content = html(tokens(home.content));
      if (home.avatar?.data?.attributes?.url) home.avatar.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(home.avatar?.data?.attributes)
      // if (home.avatar?.data) home.avatar.data.attributes.url = this.strapi.config.url.remote + home.avatar.data.attributes.url;
      return home;
    } catch (error) {
      throw error;
    }
  }
}
