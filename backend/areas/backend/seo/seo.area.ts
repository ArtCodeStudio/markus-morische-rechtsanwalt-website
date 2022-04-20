import { Area } from "alosaur/mod.ts";

import { SeoController } from "./seo.controller.ts";

@Area({
  controllers: [SeoController],
})
export class SeoArea { }
