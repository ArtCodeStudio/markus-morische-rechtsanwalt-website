import { AlosaurResponse, Controller, Get, Res, Param } from "alosaur/mod.ts";
import { ContactService } from "../../../services/contact.service.ts";

@Controller("/backend/api")
export class ApiController {
  constructor(
    private readonly contact: ContactService,
  ) { }

  @Get("/contact/:slug")
  public async getVCard(@Res() res: AlosaurResponse, @Param("slug") slug: string) {
    const vCard = await this.contact.getVCard(slug);
    res.headers.set("content-type", "text/vcard");
    return vCard;
  }
}
