import { Area } from "alosaur/mod.ts";

import { ViewController } from "./view.controller.ts";

@Area({
  controllers: [ViewController],
})
export class ViewArea {}
