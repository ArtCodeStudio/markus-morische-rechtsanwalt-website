// deno-lint-ignore-file
import { Controller, Get, Param } from "alosaur/mod.ts";
// import { ResponseCache } from "alosaur/src/hooks/response-cache/mod.ts";
import { ViewService } from "../../services/view.service.ts";

// TODO use cache service
@Controller()
export class ViewController {
  constructor(
    private readonly view: ViewService,
  ) { }

  @Get("/")
  // TODO: Fix: https://github.com/alosaur/alosaur/issues/180
  // @ResponseCache({ duration: 2000 })
  public async renderHomePage() {
    return this.view.renderHomePage();
  }

  @Get("/:slug")
  // TODO: Fix: https://github.com/alosaur/alosaur/issues/180
  // @ResponseCache({ duration: 2000 })
  public async renderDynamicPage(@Param("slug") slug: string) {
    return this.view.renderDynamicPage(slug);
  }

  @Get("/contact")
  // TODO: Fix: https://github.com/alosaur/alosaur/issues/180
  // @ResponseCache({ duration: 2000 })
  public async renderContactPage() {
    return this.view.renderContactPage();
  }

  @Get("/gallery/:slug")
  // TODO: Fix: https://github.com/alosaur/alosaur/issues/180
  // @ResponseCache({ duration: 2000 })
  public async renderDynamicGallery(@Param("slug") slug: string) {
    return this.view.renderDynamicGallery(slug);
  }
}
