import { config as dotenv } from "dotenv/mod.ts"; // Autoload .env file
import { AppSettings, ViewRenderConfig } from "alosaur/mod.ts";
import { ResponseCacheStoreToken, MemoryResponseCacheStore } from "alosaur/src/hooks/response-cache/mod.ts";
import { ViewArea } from "./areas/view/view.area.ts";
import { ApiArea } from "./areas/backend/api/api.area.ts";
import { SeoArea } from "./areas/backend/seo/seo.area.ts";
import { Log } from "./middlewares/log.middleware.ts";
import { compileFile, Options as PugOptions } from "pug/mod.ts";
const DENO_ENV = Deno.env.get("DENO_ENV") || ".env";
dotenv({ export: true, path: DENO_ENV })

const VIEW_BASE_PATH = Deno.env.get("VIEW_BASE_PATH") ||
  `${Deno.cwd()}/../theme/views`;

const SERVER_PORT = Deno.env.get("SERVER_PORT") || 8080;

const STATIC_ROOT = Deno.env.get("STATIC_ROOT") ||
  `${Deno.cwd()}/../theme/assets`;

const LOGGING = Deno.env.get("LOGGING") === "true" || false;

/** Used for client side requests to strapi */
const STRAPI_REMOTE_URL = Deno.env.get("STRAPI_REMOTE_URL") ||
  `http://localhost:3002`;

/** Used for server side requests to strapi */
const STRAPI_LOCAL_URL = Deno.env.get("STRAPI_LOCAL_URL") ||
  `http://localhost:3002`;

export const appSettings: AppSettings = {
  areas: [ViewArea, ApiArea, SeoArea],
  // TODO: Fix: https://github.com/alosaur/alosaur/issues/180
  // See also https://github.com/alosaur/alosaur/tree/master/src/hooks/response-cache
  providers: [{
    token: ResponseCacheStoreToken,
    useClass: MemoryResponseCacheStore,
  }],
  middlewares: [Log],
  logging: LOGGING,
  staticConfig: {
    root: STATIC_ROOT,
  },
};

export const serverSettings: Deno.ListenOptions = {
  port: Number(SERVER_PORT),
};

export const strapiConfig = {
  url: {
    remote: STRAPI_REMOTE_URL,
    local: STRAPI_LOCAL_URL,
  },
};

export const canonical = {
  host: Deno.env.get("CANONICAL_HOST") || "https://markusmorische.de",
}

const viewGlobalModel = {
  env: {
    STRAPI_REMOTE_URL,
  },
};

export const viewRenderConfig: ViewRenderConfig = {
  type: "pug",
  basePath: VIEW_BASE_PATH,
  getBody: async (path, model, config) => {
    if (!path.endsWith(".pug")) {
      path = path + ".pug";
    }
    path = config.basePath + "/" + path;
    model = { ...viewGlobalModel, ...model };
    const pugOptions: PugOptions = {
      basedir: config.basePath,
      globals: [],
    };

    // TODO cache the result
    const pugTemplateFn = compileFile(path, pugOptions);

    return await pugTemplateFn(model as Record<string, unknown>);
  },
};
