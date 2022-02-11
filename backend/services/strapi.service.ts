import { HttpError, NotFoundError } from "alosaur/mod.ts";
import { strapiConfig } from "../settings.ts";
import { StrapiRestAPIError } from "../types/strapi-rest-api-error.ts";
import { StrapiRestAPIList } from "../types/strapi-rest-api-list.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { join } from "std/path/mod.ts";

export class StrapiService {
  public readonly config = strapiConfig;
  private baseUrl: URL;
  public errorMessages = {
    notFound: `Not found!`,
  };

  constructor(private readonly pathname: string) {
    const url = new URL(this.config.url.local);
    url.pathname = join(url.pathname, this.pathname);
    this.baseUrl = url;
  }

  public async list<T extends StrapiRestAPIList<unknown>>(config?: { populates?: string[], filters?: { $eg?: string } }) {
    const response = await fetch(this.baseUrl);
    const data = await response.json() as StrapiRestAPIError | T;
    this.handleError(data as StrapiRestAPIError);
    if (!Array.isArray((data as T).data) || !(data as T).data.length) {
      throw new NotFoundError(this.errorMessages.notFound);
    }
    return data as T;
  }

  public async get<T = unknown>(config?: { url?: URL, populates?: string[] }) {
    config ||= {}
    const url = config.url || this.baseUrl;

    if (config.populates) {
      for (const populate of config.populates) {
        url.searchParams.append("populate", populate);
      }
    }

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
    url.search = `filters[slug][$eq]=${slug}`;
    return await this.get<T>({ url });
  }

  public handleError(error: StrapiRestAPIError | any) {
    if (!error || !Object.keys(error).length) {
      throw new NotFoundError(this.errorMessages.notFound);
    }

    if ((error as StrapiRestAPIError).status) {
      throw new HttpError(
        (error as StrapiRestAPIError).status,
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
