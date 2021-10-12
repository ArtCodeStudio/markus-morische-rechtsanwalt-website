import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPINavigation } from "../types/strapi-rest-api-navigation.ts";

@Injectable()
export class NavigationService {
  private strapi = new StrapiService("navigation");

  constructor() {}

  public async get() {
    try {
      const nav = await this.strapi.get<StrapiRestAPINavigation>();
      return nav;
    } catch (error) {
      throw error;
    }
  }
}
