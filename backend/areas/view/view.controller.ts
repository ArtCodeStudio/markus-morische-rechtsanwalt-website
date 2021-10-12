import { Controller, Get, HttpError, Param, View } from "alosaur/mod.ts";
import { PageService } from "../../services/page.service.ts";
import { HomeService } from "../../services/home.service.ts";
import { NavigationService } from "../../services/navigation.service.ts";
import { SocialLinkService } from "../../services/sozial-link.service.ts";
import { ContactService } from "../../services/contact.service.ts";
import { ViewContext } from "../../types/view-context.ts";

@Controller()
export class ViewController {
  constructor(
    private readonly home: HomeService,
    private readonly page: PageService,
    private readonly nav: NavigationService,
    private readonly socialLink: SocialLinkService,
    private readonly contact: ContactService,
  ) {}

  @Get("/")
  public async renderHome() {
    const ctx: ViewContext = {};
    try {
      const home = await this.home.get();
      const globals = await this.getGlobals();
      const html = await View("templates/home", {
        ctx,
        home,
        ...globals,
      });
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
      const globals = await this.getGlobals();
      const html = await View("templates/page", {
        ctx,
        page,
        ...globals,
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderError(error, ctx);
    }
  }

  public async renderError(error: HttpError, ctx: ViewContext) {
    const globals = await this.getGlobals();
    const html = await View("templates/error", {
      error,
      ctx,
      ...globals,
    });
    return html;
  }

  public async getGlobals() {
    const nav = await this.nav.get();
    const socialLinks = await this.socialLink.list();
    const contact = await this.contact.get();
    return {
      nav,
      socialLinks,
      contact,
    };
  }
}
