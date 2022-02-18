import { Singleton } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { CacheService } from "./cache.service.ts";
import { StrapiRestAPIGetSettings, Settings } from "../types/strapi-rest-api-settings.ts";

@Singleton()
export class SettingsService {
  private strapi = new StrapiService("setting");

  constructor(private readonly cache: CacheService<string, Settings>) { }

  public async _get() {
    const { data } = await this.strapi.get<StrapiRestAPIGetSettings>();
    const settings = data.attributes
    settings.maintenanceText = this.strapi.renderMarkdown(settings.maintenanceText);
    return settings;
  }

  public async get() {
    const key = `${this.strapi.baseUrl.pathname}`;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const settings = await this._get();
    this.cache.set(key, settings);
    return this.cache.get(key);
  }
}
