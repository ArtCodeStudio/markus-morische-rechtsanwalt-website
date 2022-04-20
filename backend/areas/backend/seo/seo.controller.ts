import { Controller, Get } from "alosaur/mod.ts";
import { SitemapService } from "../../../services/sitemap.service.ts";

@Controller("/")
export class SeoController {
  constructor(
    private readonly sitemap: SitemapService,
  ) { }

  @Get("sitemap.xml")
  public async getSitemap() {
    return await this.sitemap.generateSitemap();
  }

  @Get("robots.txt")
  public getRobots() {
    return this.sitemap.generateRobotsTxt();
  }

}
