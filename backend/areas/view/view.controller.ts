// deno-lint-ignore-file
import { Controller, Get, HttpError, Param, View } from "alosaur/mod.ts";
import { PageService } from "../../services/page.service.ts";
import { HomeService } from "../../services/home.service.ts";
import { NavigationService } from "../../services/navigation.service.ts";
import { SocialLinkService } from "../../services/sozial-link.service.ts";
import { ContactService } from "../../services/contact.service.ts";
import { SettingsService } from "../../services/settings.service.ts";
import { ViewContext } from "../../types/view-context.ts";

@Controller()
export class ViewController {
  constructor(
    private readonly settings: SettingsService,
    private readonly nav: NavigationService,
    private readonly socialLink: SocialLinkService,
    private readonly contact: ContactService,
    private readonly home: HomeService,
    private readonly page: PageService,
  ) {}

  @Get("/")
  public async renderHomePage() {
    const ctx: ViewContext = {};
    try {
      const globals = await this.getGlobals();
      if (globals.settings.maintenanceMode) {
        return this.renderMaintenancePage(globals);
      }
      const home = await this.home.get();
      const html = await View("templates/home", {
        ctx,
        home,
        ...globals,
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderErrorPage(error, ctx);
    }
  }
  @Get("/:slug")
  public async renderDynamicPage(@Param("slug") slug: string) {
    const ctx: ViewContext = {
      slug,
    };
    try {
      const globals = await this.getGlobals();
      if (globals.settings.maintenanceMode) {
        return this.renderMaintenancePage(globals);
      }
      const page = await this.page.get(slug);
      const html = await View("templates/page", {
        ctx,
        page,
        ...globals,
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderErrorPage(error, ctx);
    }
  }

  public async renderErrorPage(error: HttpError, ctx: ViewContext) {
    const globals = await this.getGlobals();
    const html = await View("templates/error", {
      error,
      ctx,
      ...globals,
    });
    return html;
  }

  public async renderMaintenancePage(model: any) {
    const html = await View("templates/maintenance", model);
    return html;
  }

  public async getGlobals() {
    const settings = await this.settings.get();
    const nav = await this.nav.get();
    const socialLinks = await this.socialLink.list();
    const contact = await this.contact.get();
    return {
      settings,
      nav,
      socialLinks,
      contact,
    };
  }
}
