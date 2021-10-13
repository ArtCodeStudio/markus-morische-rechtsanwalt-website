import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPISocialLink } from "../types/strapi-rest-api-social-link.ts";

@Injectable()
export class SocialLinkService {
  private strapi = new StrapiService("social-links");

  constructor() {}

  public async list() {
    const links = await this.strapi.list<StrapiRestAPISocialLink>();
    return links.filter((link) => link.active !== false);
  }
}
