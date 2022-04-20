import { Singleton } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIListSocialLink, SocialLink } from "../types/strapi-rest-api-social-link.ts";

@Singleton()
export class SocialLinkService {
  private strapi = new StrapiService("social-links");

  constructor(private readonly cache: CacheService<string, SocialLink[]>) { }

  public async _list() {
    const { data } = await this.strapi.list<StrapiRestAPIListSocialLink>();
    if (!data) {
      return [];
    }
    const links = data.map((dat) => {
      const attr = dat.attributes;
      const platform = attr.icon.replaceAll("social_", "").replaceAll(
        "_circle",
        "",
      ).replaceAll("_square", "").replaceAll(".svg", "");
      attr.platform = platform;
      return attr;
    });
    return links.filter((link) => link.active !== false);
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
}
