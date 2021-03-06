import { Middleware } from "alosaur/src/decorator/Middleware.ts";
import { MiddlewareTarget } from "alosaur/src/models/middleware-target.ts";

import { Context } from "alosaur/src/models/context.ts";

// @Middleware(/^.*$/)
@Middleware(new RegExp("/"))
export class Log implements MiddlewareTarget<unknown> {
  date: Date = new Date();

  onPreRequest(/*context: Context<unknown>*/) {
    return new Promise<void>((resolve) => {
      this.date = new Date();
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    return new Promise<void>((resolve) => {
      console.info(
        (context as any)?.request?.url,
        context?.state,
        new Date().getTime() - this.date.getTime(),
      );
      resolve();
    });
  }
}
