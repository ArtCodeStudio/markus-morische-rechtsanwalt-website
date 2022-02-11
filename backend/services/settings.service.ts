import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPISettings } from "../types/strapi-rest-api-settings.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class SettingsService {
  private strapi = new StrapiService("setting");

  constructor() { }

  public async get() {
    try {
      const { data } = await this.strapi.get<StrapiRestAPISettings>();
      const settings = data.attributes
      settings.maintenanceText = html(tokens(settings.maintenanceText));
      return settings;
    } catch (error) {
      throw error;
    }
  }
}
