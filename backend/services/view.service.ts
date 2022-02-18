import { Singleton, HttpError, View, ActionResult } from "alosaur/mod.ts";
import { PageService } from "./page.service.ts";
import { GalleryService } from "./gallery.service.ts";
import { HomeService } from "./home.service.ts";
import { NavigationService } from "./navigation.service.ts";
import { SocialLinkService } from "./sozial-link.service.ts";
import { OfficeService } from "./office.service.ts";
import { ContactService } from "./contact.service.ts";
import { SettingsService } from "./settings.service.ts";
import { SeoService } from "./seo.service.ts";
import { CacheService } from "./cache.service.ts";

import type { ViewContext } from "../types/view-context.ts";

// TODO use cache service
@Singleton()
export class ViewService {
    constructor(
        private readonly settings: SettingsService,
        private readonly nav: NavigationService,
        private readonly socialLink: SocialLinkService,
        private readonly office: OfficeService,
        private readonly contact: ContactService,
        private readonly home: HomeService,
        private readonly page: PageService,
        private readonly gallery: GalleryService,
        private readonly seo: SeoService,
        private readonly cache: CacheService<string, ActionResult>
    ) { }

    public async _renderHomePage(template: string) {
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
            const html = await View(template, {
                ctx,
                home,
                ...globals,
                ...seo,
            });
            return html;
        } catch (error) {
            console.error(error);
            return this.renderErrorPage(error, ctx);
        }
    }

    public async renderHomePage() {
        const template = "templates/home";
        const key = `${template}`;
        if (this.cache.has(key)) {
            const result = this.cache.get(key);
            result.__isActionResult = true;
            return result;
        }
        const contact = await this._renderHomePage(template);
        this.cache.set(key, contact);
        return this.cache.get(key);
    }

    public async _renderDynamicPage(template: string, slug: string) {
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
            const html = await View(template, {
                ctx,
                page,
                ...globals,
                ...seo,
            });
            return html;
        } catch (error) {
            console.error(error);
            return this.renderErrorPage(error, ctx);
        }
    }

    public async renderDynamicPage(slug: string) {
        const template = "templates/page";
        const key = `${template}/${slug}`;
        if (this.cache.has(key)) {
            const result = this.cache.get(key);
            result.__isActionResult = true;
            return result;
        }
        const contact = await this._renderDynamicPage(template, slug);
        this.cache.set(key, contact);
        return this.cache.get(key);
    }

    public async _renderContactPage(template: string) {
        const ctx: ViewContext = {};
        try {
            const globals = await this.getGlobals();
            if (globals.settings.maintenanceMode) {
                return this.renderMaintenancePage(globals);
            }
            const contact = await this.contact.get();
            const seo = this.seo.get({
                template: "contact",
                contact,
            });
            const html = await View(template, {
                ctx,
                contact,
                ...globals,
                ...seo,
            });
            return html;
        } catch (error) {
            console.error(error);
            return this.renderErrorPage(error, ctx);
        }
    }

    public async renderContactPage() {
        const template = "templates/contact";
        const key = `${template}`;
        if (this.cache.has(key)) {
            const result = this.cache.get(key);
            result.__isActionResult = true;
            return result;
        }
        const contact = await this._renderContactPage(template);
        this.cache.set(key, contact);
        return this.cache.get(key);
    }

    public async _renderDynamicGallery(template: string, slug: string) {
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
            const html = await View(template, {
                ctx,
                gallery,
                ...globals,
                ...seo,
            });
            return html;
        } catch (error) {
            console.error(error);
            return this.renderErrorPage(error, ctx);
        }
    }

    public async renderDynamicGallery(slug: string) {
        const template = "templates/gallery";
        const key = `${template}/${slug}`;
        if (this.cache.has(key)) {
            const result = this.cache.get(key);
            result.__isActionResult = true;
            return result;
        }
        const contact = await this._renderDynamicGallery(template, slug);
        this.cache.set(key, contact);
        return this.cache.get(key);
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
        let email: string = offices[0].email;
        let firstName: string = offices[0].firstName;
        let lastName: string = offices[0].lastName;
        let title: string = offices[0].title;

        for (const office of offices) {
            email ||= office.email;
            firstName ||= office.firstName;
            lastName ||= office.lastName;
            title ||= office.title;
        }

        return {
            settings,
            nav,
            socialLinks,
            offices,
            email,
            firstName,
            lastName,
            title
        };
    }
}
