import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIGetSettings } from "../types/strapi-rest-api-settings.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class SettingsService {
  private strapi = new StrapiService("setting");

  constructor() { }

  public async get() {
    const { data } = await this.strapi.get<StrapiRestAPIGetSettings>();
    const settings = data.attributes
    settings.maintenanceText = html(tokens(settings.maintenanceText));
    return settings;
  }
}
