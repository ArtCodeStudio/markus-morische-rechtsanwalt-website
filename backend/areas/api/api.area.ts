import { Area } from "alosaur/mod.ts";

import { ApiController } from "./api.controller.ts";

@Area({
  controllers: [ApiController],
})
export class ApiArea {}
