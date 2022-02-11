import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPINavigation } from "../types/strapi-rest-api-navigation.ts";

@Injectable()
export class NavigationService {
  private strapi = new StrapiService("navigation");

  constructor() { }

  public async get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPINavigation>({ populates: ["links", "links.page"] });
      const nav = data.attributes;
      return nav;
    } catch (error) {
      throw error;
    }
  }
}
