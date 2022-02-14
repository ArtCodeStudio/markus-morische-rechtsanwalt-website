import { StrapiRestAPIGet } from "./strapi-rest-api-get.ts";
import { StrapiDataBase } from "./strapi-data-base.ts";

export interface Settings extends StrapiDataBase {
  maintenanceMode: boolean;
  maintenanceText: string;
}

export type StrapiRestAPIGetSettings = StrapiRestAPIGet<Settings>;
