import { Controller, Get, HttpError, Param, View } from "alosaur/mod.ts";
import { PageService } from "../../services/page.service.ts";
import { ViewContext } from "../../types/index.ts";

@Controller()
export class ViewController {
  constructor(private readonly page: PageService) {}

  @Get("/")
  public async renderHome() {
    const ctx: ViewContext = {};
    try {
      const html = await View("pages/home", {});
      return html;
    } catch (error) {
      console.error(error);
      return this.renderError(error, ctx);
    }
  }
  @Get("/:slug")
  public async renderPage(@Param("slug") slug: string) {
    const ctx: ViewContext = {
      slug,
    };
    try {
      const page = await this.page.get(slug);
      const html = await View("pages/page", {
        ctx,
        page,
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderError(error, ctx);
    }
  }

  public async renderError(error: HttpError, ctx: ViewContext) {
    const html = await View("pages/error", {
      error,
      ctx,
    });
    return html;
  }
}
