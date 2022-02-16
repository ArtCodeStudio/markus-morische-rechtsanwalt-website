import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIGetHome, Home } from "../types/strapi-rest-api-home.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class HomeService {
  private strapi = new StrapiService("home");

  constructor() { }

  public async get() {
    const { data } = await this.strapi.get<StrapiRestAPIGetHome>({
      query: {
        populate: [
          "avatar"
        ]
      }
    });
    const home = data.attributes;
    return this.transform(home);
  }

  private transform(home: Home) {
    if (home.content) home.content = html(tokens(home.content));
    if (home.avatar?.data?.attributes?.url) home.avatar.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(home.avatar.data.attributes)
    return home;
  }
}
