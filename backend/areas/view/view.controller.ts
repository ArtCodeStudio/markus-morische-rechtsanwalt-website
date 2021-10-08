import { Controller, View } from "alosaur/mod.ts";
import { Get } from "alosaur/src/decorator/Get.ts";

@Controller()
export class ViewController {
  @Get()
  public async getHome() {
    return await View("pages/home", {});
  }
  @Get("/test")
  public async getTest() {
    console.log("getTest");
    try {
      return await View("pages/test", {
        firstname: "Pascal",
        lastname: "Garber",
      });
    } catch (error) {
      console.error(error);
    }
  }
}
