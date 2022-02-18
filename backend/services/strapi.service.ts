import { HttpError, NotFoundError } from "alosaur/mod.ts";
import { strapiConfig } from "../settings.ts";
import { StrapiRestAPIError } from "../types/strapi-rest-api-error.ts";
import { StrapiRestAPIList } from "../types/strapi-rest-api-list.ts";
import { StrapiRestAPIRequestOptions } from "../types/strapi-rest-api-request-options.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { join } from "std/path/mod.ts";
import { qs } from "qs/mod.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

export class StrapiService {
  public readonly config = strapiConfig;
  public baseUrl: URL;
  public errorMessages = {
    notFound: `Not found!`,
  };

  constructor(private readonly pathname: string) {
    const url = new URL(this.config.url.local);
    if (url.pathname.endsWith('api')) {
      url.pathname = join(url.pathname, this.pathname);
    } else {
      url.pathname = join(url.pathname, 'api', this.pathname);
    }
    this.baseUrl = url;
  }

  public async list<T extends StrapiRestAPIList<unknown>>(options?: StrapiRestAPIRequestOptions) {
    options ||= {}
    const url = new URL(options.url?.toString() || this.baseUrl.toString());

    if (options.query) {
      url.search = this.getQueryStr(options.query);
    }

    const response = await fetch(url);
    this.handleResponseError(response);
    const data = await response.json() as StrapiRestAPIError | T;
    this.handleApiError(data as StrapiRestAPIError);
    if (!Array.isArray((data as T).data)) {
      throw new NotFoundError(this.errorMessages.notFound);
    }
    return data as T;
  }

  public async get<T = unknown>(options?: StrapiRestAPIRequestOptions) {
    options ||= {}
    const url = new URL(options.url?.toString() || this.baseUrl.toString());

    if (options.query) {
      url.search = this.getQueryStr(options.query);
    }

    const response = await fetch(url);
    this.handleResponseError(response);
    const data = await response.json() as StrapiRestAPIError | T;
    this.handleApiError(data as StrapiRestAPIError);
    if (Array.isArray(data)) {
      return data[0] as T;
    }
    return data as T;
  }

  public async getBySlug<T = unknown>(slug: string, options?: StrapiRestAPIRequestOptions) {
    const url = new URL(this.baseUrl.toString());
    options ||= {};
    options.query ||= {};
    options.query.filters ||= {};
    options.query.filters.slug = {
      $eq: slug
    }
    return await this.get<T>({ ...options, url });
  }

  public handleResponseError(res: Response) {
    if (res.status === 404) {
      console.error(`[${this.pathname}] ${res.url} Not found!`)
      throw new NotFoundError(`[${this.pathname}] res.statusText`);
    }

    if (res.status >= 300) {
      console.error(`[${this.pathname}] Error on request`, res)
      throw new HttpError(
        res.status,
        res.statusText,
      );
    }
  }

  public handleApiError(error: StrapiRestAPIError | any) {
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
    if (image.url.startsWith(this.config.url.remote)) {
      return image.url;
    }
    const url = new URL(this.config.url.remote);
    // TODO this overwrites /api
    url.pathname = /*url.pathname +*/ image.url;
    return url.toString();
  }

  public getImageType(image: StrapiImage) {
    const type = image.mime.replace("image/", "");
    return type;
  }

  /** See https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html */
  private getQueryStr(query: StrapiRestAPIRequestOptions['query']) {
    return qs.stringify(query, { encodeValuesOnly: true })
  }

  public renderMarkdown(content: string) {
    return content = html(tokens(content));
  }
}
