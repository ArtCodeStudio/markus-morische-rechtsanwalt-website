import { Singleton } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIGetNavigation, Navigation } from "../types/strapi-rest-api-navigation.ts";
import { NavigationLink } from "../types/strapi-rest-api-navigation-link.ts";

@Singleton()
export class NavigationService {
  private strapi = new StrapiService("navigation");

  constructor(private readonly cache: CacheService<string, Navigation>) { }

  private transformNavLink(link: NavigationLink) {
    if (link.page && link.page.data) {
      link.url = `/${link.page.data.attributes.slug}`;
    }
    else if (link.gallery && link.gallery.data) {
      link.url = `/gallery/${link.gallery.data.attributes.slug}`;
    }
    return link;
  }

  private transformNav(nav: Navigation) {
    nav.links = nav.links.map(this.transformNavLink);
    return nav;
  }

  public async _get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPIGetNavigation>({
        query: {
          populate: {
            links: {
              populate: {
                page: {
                  fields: ["slug"]
                },
                gallery: {
                  fields: ["slug"]
                },
              }
            }
          }
        }
      });
      const nav = this.transformNav(data.attributes);
      return nav;
    } catch (error) {
      throw error;
    }
  }

  public async get() {
    const key = `${this.strapi.baseUrl.pathname}`;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const nav = await this._get();
    this.cache.set(key, nav);
    return this.cache.get(key);
  }
}
