import { ready } from "@ribajs/utils/src/dom";
import { Riba, View, coreModule } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { EventDispatcher } from "@ribajs/events";
import { routerModule, FadeTransition } from "@ribajs/router";
import { bs5Module } from "@ribajs/bs5";
import { leafletModule } from "@ribajs/leaflet-map";
import { strapiModule } from "@ribajs/strapi";
import { artAndCodeStudioModule } from "@ribajs/artcodestudio";

// Own
import * as components from "./components";
import * as pages from "./pages";
import * as binders from "./binders";
import * as formatters from "./formatters";

declare global {
  interface Window {
    env: {
      STRAPI_REMOTE_URL: string;
    };
  }
}

export class CSRApp {
  protected view?: View;
  protected riba = new Riba();
  protected model: any = {};
  protected routerEvents = EventDispatcher.getInstance("main");

  protected onPageChanges() {

  }

  constructor() {
    this.riba.configure({
      prefix: ["rv", "csr-rv"],
    });

    // Regist custom components
    this.riba.module.component.regists({
      ...components,
      ...pages,
    });
    this.riba.module.binder.regists({ ...binders });
    this.riba.module.formatter.regists({ ...formatters });

    // Regist modules
    this.riba.module.regist(coreModule.init());
    this.riba.module.regist(extrasModule.init());
    this.riba.module.regist(
      routerModule.init({
        defaultTransition: new FadeTransition(),
      })
    );
    this.riba.module.regist(bs5Module.init());
    this.riba.module.regist(leafletModule);
    this.riba.module.regist(strapiModule.init({}));
    this.riba.module.regist(artAndCodeStudioModule.init({}));    

    this.view = this.riba.bind(document.body, this.model);

    this.view.registComponents();

    this.riba.lifecycle.events.on(
      "ComponentLifecycle:error",
      (error: Error) => {
        console.error(error);
      }
    );

    this.routerEvents.on("transitionCompleted", this.onPageChanges, this);
  }
}

ready(() => {
  new CSRApp();
});
