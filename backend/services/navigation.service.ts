import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIGetNavigation } from "../types/strapi-rest-api-navigation.ts";

@Injectable()
export class NavigationService {
  private strapi = new StrapiService("navigation");

  constructor() { }

  public async get() {
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
      const nav = data.attributes;
      return nav;
    } catch (error) {
      throw error;
    }
  }
}
