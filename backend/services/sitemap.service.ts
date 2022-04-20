import { Singleton } from "alosaur/mod.ts";
import { NavigationService } from "./navigation.service.ts";
import { canonical } from "../settings.ts"
import { SitemapLink } from "../types/sitemap-link.ts";

@Singleton()
export class SitemapService {

    _sitemap = ''

    constructor(private readonly nav: NavigationService) {

    }

    public generateSitemapXml(host: string, links: SitemapLink[]) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n\n';

        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        xml += '\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
        xml += '\txsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
        xml += '\thttp://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

        links.forEach((link) => {
            xml += '\t<url>\n';
            xml += `\t\t<loc>${host}${link.loc}</loc>\n`;
            if (link.lastmod) xml += `\t\t<lastmod>${link.lastmod}</lastmod>\n`;
            if (link.changefreq) xml += `\t\t<changefreq>${link.changefreq}</changefreq>\n`;
            xml += `\t\t<priority>${link.priority || '1.00'}</priority>\n`;
            xml += '\t</url>\n';
        });

        xml += '\n</urlset>\n';

        return xml;
    }

    public async generateSitemap() {
        const nav = await this.nav.get();

        const links: SitemapLink[] = []

        for (const link of nav.links) {
            links.push({
                loc: link.url, changefreq: 'yearly', priority: 0
            })
        }

        return this.generateSitemapXml(canonical.host, links);
    }

    public generateRobotsTxt() {
        return `User-agent: *
Allow: /
Sitemap: ${canonical.host}/sitemap.xml`
    }
}