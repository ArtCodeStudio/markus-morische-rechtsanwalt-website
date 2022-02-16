import { Component } from "@ribajs/core";
import { scrollToPosition, debounce } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

export interface Scope {
  scrollWrapperEl?: HTMLDivElement;
  center: MMMapComponent['center'];
}

export class MMMapComponent extends Component {
  public static tagName = "mm-map";
  public _debug = false;
  protected autobind = true;
  protected routerEvents?: EventDispatcher;

  scope: Scope = {
    center: this.center,
  };

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
  }

  public center() {
    if (this.scope.scrollWrapperEl) {
      scrollToPosition(this.scope.scrollWrapperEl, "center", "both", "auto")
    }
  }


  protected connectedCallback() {
    super.connectedCallback();
    this.init(MMMapComponent.observedAttributes);
    this.initEventListeners();
  }

  protected initEventListeners() {
    this.routerEvents = new EventDispatcher("main");
    this.center = debounce(this.center.bind(this));
    window.addEventListener("resize", this.center, { passive: true });
    this.routerEvents.on("newPageReady", this.center, this);
  }

  protected removeEventListeners() {
    window.removeEventListener("resize", this.center);
    this.routerEvents?.off("newPageReady", this.center, this);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    super.beforeBind();
    this.center();
  }

  protected async afterBind() {
    super.afterBind();
    this.center();
  }

  protected template() {
    return null;
  }
}
