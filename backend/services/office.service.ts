import { Injectable, NotFoundError } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIListOffice, Office } from "../types/strapi-rest-api-office.ts";

@Injectable()
export class OfficeService {
  private strapi = new StrapiService("offices");

  constructor() { }

  public async list() {
    const { data } = await this.strapi.list<StrapiRestAPIListOffice>({
      query: {
        populate: [
          "photo", "map"
        ]
      }
    });
    const offices = data.map((page) => this.transform(page.attributes));
    return Array.from(offices);
  }

  public async get(slug: string) {
    try {
      const { data } = await this.strapi.getBySlug<StrapiRestAPIListOffice>(slug, {
        query: {
          populate: [
            "photo", "map"
          ]
        }
      });
      if (!Array.isArray(data) || !data.length) {
        throw new NotFoundError(this.strapi.errorMessages.notFound);
      }
      const office = data[0].attributes;
      this.transform(office);
      return office;
    } catch (error) {
      throw error;
    }
  }

  private transform(office: Office) {
    if (office.photo?.data?.attributes?.url) office.photo.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(office.photo?.data?.attributes);
    if (office.map?.data?.attributes?.url) office.map.data.attributes.url = this.strapi.getRemoteStrapiImageUrl(office.map?.data?.attributes);
    return office;
  }
}
