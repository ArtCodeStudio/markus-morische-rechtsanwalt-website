import { Area } from "alosaur/mod.ts";

import { Api2Controller } from "./api2.controller.ts";

@Area({
  controllers: [Api2Controller],
})
export class Api2Area {}
