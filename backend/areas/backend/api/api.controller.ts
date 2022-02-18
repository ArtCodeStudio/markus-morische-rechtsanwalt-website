import { AlosaurResponse, Controller, Get, Post, Res, Param } from "alosaur/mod.ts";
import { ContactService } from "../../../services/contact.service.ts";
import { CacheService } from "../../../services/cache.service.ts";

@Controller("/backend/api")
export class ApiController {
  constructor(
    private readonly contact: ContactService,
    private readonly cache: CacheService<string, unknown>,
  ) { }

  @Get("/contact/:slug")
  public async getVCard(@Res() res: AlosaurResponse, @Param("slug") slug: string) {
    const vCard = await this.contact.getVCard(slug);
    res.headers.set("content-type", "text/vcard");
    return vCard;
  }

  @Post("/cache/clear/:key")
  // @Get("/cache/clear/:key")
  public clearCache(@Param("key") key: string) {
    try {
      if (key === 'all') {
        console.debug("Clear full cache");
        this.cache.clear();
      } else {
        console.debug(`Clear cache by key "${key}"`);
        this.cache.delete(key);
      }
    } catch (error) {
      console.error();
      throw error;
    }

    return {}
  }
}
