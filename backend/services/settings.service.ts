import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPISettings } from "../types/strapi-rest-api-settings.ts";

@Injectable()
export class SettingsService {
  private strapi = new StrapiService("settings");

  constructor() {}

  public async get() {
    try {
      const nav = await this.strapi.get<StrapiRestAPISettings>();
      return nav;
    } catch (error) {
      throw error;
    }
  }
}
