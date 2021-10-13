import { StrapiRestAPIBase } from "./strapi-rest-api-base.ts";

export interface StrapiRestAPISettings extends StrapiRestAPIBase {
  maintenanceMode: boolean;
  maintenanceText: string;
}
