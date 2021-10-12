import { Controller, Get, HttpError, Param, View } from "alosaur/mod.ts";
import { PageService } from "../../services/page.service.ts";
import { HomeService } from "../../services/home.service.ts";
import { ViewContext } from "../../types/view-context.ts";

@Controller()
export class ViewController {
  constructor(
    private readonly home: HomeService,
    private readonly page: PageService,
  ) {}

  @Get("/")
  public async renderHome() {
    const ctx: ViewContext = {};
    try {
      const home = await this.home.get();
      console.debug("home", home);
      const html = await View("templates/home", { ctx, home });
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
      const html = await View("templates/page", {
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
    const html = await View("templates/error", {
      error,
      ctx,
    });
    return html;
  }
}
