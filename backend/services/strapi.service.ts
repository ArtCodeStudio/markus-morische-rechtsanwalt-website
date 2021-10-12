import { HttpError, NotFoundError } from "alosaur/mod.ts";
import { strapiConfig } from "../settings.ts";
import { StrapiRestAPIError } from "../types/index.ts";

export class StrapiService {
  private config = strapiConfig;
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

  public async getBySlug<T = unknown>(slug: string) {
    const url = new URL(this.baseUrl.toString());
    url.search = `slug=${slug}`;
    console.debug("url", url.toString());
    const response = await fetch(url);
    const data = await response.json() as StrapiRestAPIError | T;
    this.handleError(data as StrapiRestAPIError);
    if (Array.isArray(data)) {
      return data[0] as T;
    }
    throw new NotFoundError(this.errorMessages.notFound);
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
}
