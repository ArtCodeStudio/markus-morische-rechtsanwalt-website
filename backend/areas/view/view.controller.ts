// deno-lint-ignore-file
import { Controller, Get, HttpError, Param, View } from "alosaur/mod.ts";
import { PageService } from "../../services/page.service.ts";
import { GalleryService } from "../../services/gallery.service.ts";
import { HomeService } from "../../services/home.service.ts";
import { NavigationService } from "../../services/navigation.service.ts";
import { SocialLinkService } from "../../services/sozial-link.service.ts";
import { OfficeService } from "../../services/office.service.ts";
import { SettingsService } from "../../services/settings.service.ts";
import { SeoService } from "../../services/seo.service.ts";

import type { ViewContext } from "../../types/view-context.ts";
import type { Office } from "../../types/strapi-rest-api-office.ts";

@Controller()
export class ViewController {
  constructor(
    private readonly settings: SettingsService,
    private readonly nav: NavigationService,
    private readonly socialLink: SocialLinkService,
    private readonly office: OfficeService,
    private readonly home: HomeService,
    private readonly page: PageService,
    private readonly gallery: GalleryService,
    private readonly seo: SeoService,
  ) { }

  @Get("/")
  public async renderHomePage() {
    const ctx: ViewContext = {};
    try {
      const globals = await this.getGlobals();
      if (globals.settings.maintenanceMode) {
        return this.renderMaintenancePage(globals);
      }
      const home = await this.home.get();
      const seo = this.seo.get({
        template: "home",
        home,
      });
      const html = await View("templates/home", {
        ctx,
        home,
        ...globals,
        seo,
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
      const seo = this.seo.get({
        template: "page",
        page,
      });
      const html = await View("templates/page", {
        ctx,
        page,
        ...globals,
        seo,
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderErrorPage(error, ctx);
    }
  }

  @Get("/contact")
  public async renderContactPage() {
    const ctx: ViewContext = {};
    try {
      const globals = await this.getGlobals();
      if (globals.settings.maintenanceMode) {
        return this.renderMaintenancePage(globals);
      }
      const seo = this.seo.get({
        template: "contact",
        offices: globals.offices,
      });
      const html = await View("templates/contact", {
        ctx,
        ...globals,
        seo,
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderErrorPage(error, ctx);
    }
  }

  @Get("/gallery/:slug")
  public async renderDynamicGallery(@Param("slug") slug: string) {
    const ctx: ViewContext = {
      slug,
    };
    try {
      const globals = await this.getGlobals();
      if (globals.settings.maintenanceMode) {
        return this.renderMaintenancePage(globals);
      }
      const gallery = await this.gallery.get(slug);
      const seo = this.seo.get({
        template: "gallery",
        gallery,
      });
      const html = await View("templates/gallery", {
        ctx,
        gallery,
        ...globals,
        seo,
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
    const offices = await this.office.list();
    let contact: Partial<Office> = {};

    for (const office of offices) {
      contact = { ...contact, ...office }
    }

    return {
      settings,
      nav,
      socialLinks,
      offices,
      contact
    };
  }
}
