import { ready } from "@ribajs/utils/src/dom";
import { Riba, View, coreModule } from "@ribajs/core";
import { routerModule, FadeTransition } from "@ribajs/router";
import { extrasModule } from "@ribajs/extras";
import { masonryModule } from "@ribajs/masonry";
import { bs5Module } from "@ribajs/bs5";
import { bs5PhotoswipeModule } from "@ribajs/bs5-photoswipe";
import { strapiModule } from "@ribajs/strapi";

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
    this.riba.module.regist(
      routerModule.init({
        defaultTransition: new FadeTransition(),
      })
    );
    this.riba.module.regist(extrasModule.init({}));
    this.riba.module.regist(masonryModule.init({}));
    this.riba.module.regist(bs5Module.init({ allowStoreDataInBrowser: false }));
    this.riba.module.regist(bs5PhotoswipeModule.init({}));
    this.riba.module.regist(strapiModule.init({}));

    this.view = this.riba.bind(document.body, this.model);

    this.view.registComponents();

    this.riba.lifecycle.events.on(
      "ComponentLifecycle:error",
      (error: Error) => {
        console.error(error);
      }
    );
  }
}

ready(() => {
  new CSRApp();
});
