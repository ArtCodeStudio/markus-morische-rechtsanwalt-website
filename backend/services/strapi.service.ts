import { HttpError, NotFoundError } from "alosaur/mod.ts";
import { strapiConfig } from "../settings.ts";
import { StrapiRestAPIError } from "../types/strapi-rest-api-error.ts";
import { StrapiImage } from "../types/strapi-image.ts";

export class StrapiService {
  public readonly config = strapiConfig;
  private baseUrl: URL;
  private errorMessages = {
    notFound: `Not found!`,
  };

  constructor(private readonly contentType: string) {
    const url = new URL(this.config.url.local);
    url.pathname = this.contentType;
    this.baseUrl = url;
  }

  public async list<T = unknown>() {
    const response = await fetch(this.baseUrl);
    const data = await response.json() as StrapiRestAPIError | T;
    this.handleError(data as StrapiRestAPIError);
    if (!Array.isArray(data) || !data.length) {
      throw new NotFoundError(this.errorMessages.notFound);
    }
    return data as T[];
  }

  public async get<T = unknown>(url?: URL) {
    url = url || this.baseUrl;
    const response = await fetch(url);
    const data = await response.json() as StrapiRestAPIError | T;
    this.handleError(data as StrapiRestAPIError);
    if (Array.isArray(data)) {
      return data[0] as T;
    }
    return data as T;
  }

  public async getBySlug<T = unknown>(slug: string) {
    const url = new URL(this.baseUrl.toString());
    url.search = `slug=${slug}`;
    return await this.get<T>(url);
  }

  public handleError(error: StrapiRestAPIError | any) {
    if (!error || !Object.keys(error).length) {
      throw new NotFoundError(this.errorMessages.notFound);
    }

    if ((error as StrapiRestAPIError).statusCode) {
      throw new HttpError(
        (error as StrapiRestAPIError).statusCode,
        (error as StrapiRestAPIError).message,
      );
    }
  }

  public getRemoteStrapiImageUrl(image: StrapiImage) {
    const url = new URL(this.config.url.remote);
    url.pathname = url.pathname + image.url;
    return url.toString();
  }
}
