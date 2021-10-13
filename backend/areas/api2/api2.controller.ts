import { AlosaurResponse, Controller, Get, Res } from "alosaur/mod.ts";
import { ContactService } from "../../services/contact.service.ts";

@Controller("/api2")
export class Api2Controller {
  constructor(
    private readonly contact: ContactService,
  ) {}

  @Get("/contact")
  public async getVCard(@Res() res: AlosaurResponse) {
    const vCard = await this.contact.getVCard();
    res.headers.set("content-type", "text/vcard");
    return vCard;
  }
}
