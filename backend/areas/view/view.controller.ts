import { Controller, View } from "alosaur/mod.ts";
import { Get } from "alosaur/src/decorator/Get.ts";

@Controller()
export class ViewController {
  @Get("/")
  public async getHome() {
    try {
      const page = await View("pages/home", {});
      return page;
    } catch (error) {
      console.error(error);
    }
  }
  @Get("/test")
  public async getTest() {
    console.log("getTest");
    try {
      const page = await View("pages/test", {
        firstname: "Pascal",
        lastname: "Garber",
      });
      return page;
    } catch (error) {
      console.error(error);
    }
  }
}
