import { Injectable, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIListOffice } from "../types/strapi-rest-api-office.ts";

@Injectable()
export class OfficeService {
  private strapi = new StrapiService("offices");

  constructor() { }

  public async list() {
    const { data } = await this.strapi.list<StrapiRestAPIListOffice>({ populates: ["photo"] });
    const offices = data.map((page) => page.attributes);
    return offices;
  }

  public async get(slug: string) {
    try {
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListOffice>(slug, { populates: ["photo"] });
      if (!Array.isArray(data) || !data.length) {
        throw new NotFoundError(this.strapi.errorMessages.notFound);
      }
      const office = data[0].attributes;
      return office;
    } catch (error) {
      throw error;
    }
  }


}
