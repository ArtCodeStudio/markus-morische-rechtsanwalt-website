import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIListSocialLink } from "../types/strapi-rest-api-social-link.ts";

@Injectable()
export class SocialLinkService {
  private strapi = new StrapiService("social-links");

  constructor() { }

  public async list() {
    const { data } = await this.strapi.list<StrapiRestAPIListSocialLink>();
    const links = data.map((dat) => dat.attributes);
    return links.filter((link) => link.active !== false);
  }
}
