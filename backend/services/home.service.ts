import { Singleton } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIGetHome, Home } from "../types/strapi-rest-api-home.ts";

@Singleton()
export class HomeService {
  private strapi = new StrapiService("home");

  constructor(private readonly cache: CacheService<string, Home>) { }

  public async _get() {
    const { data } = await this.strapi.get<StrapiRestAPIGetHome>({
      query: {
        populate: [
          "avatar", "seo", "openGraph", "openGraph.images"
        ]
      }
    });
    const home = data.attributes;
    return this.transform(home);
  }

  public async get() {
    const key = `${this.strapi.baseUrl.pathname}`;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const home = await this._get();
    this.cache.set(key, home);
    return this.cache.get(key);
  }

  private transform(home: Home) {
    if (home.content) home.content = this.strapi.renderMarkdown(home.content);
    if (home.avatar?.data?.attributes?.url) home.avatar.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(home.avatar.data.attributes)
    return home;
  }
}
