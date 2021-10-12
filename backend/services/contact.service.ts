import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIContact } from "../types/strapi-rest-api-contact.ts";

@Injectable()
export class ContactService {
  private strapi = new StrapiService("contact");

  constructor() {}

  public async get() {
    try {
      const nav = await this.strapi.get<StrapiRestAPIContact>();
      return nav;
    } catch (error) {
      throw error;
    }
  }
}
