import { Component } from "@ribajs/core";
import { debounce } from "@ribajs/utils";

export interface Scope {
  colHamburgerEl?: HTMLDivElement;
  colNavEl?: HTMLDivElement;
  colToolsEl?: HTMLDivElement;
}

export class MMNavbarComponent extends Component {
  public static tagName = "mm-navbar";
  public _debug = false;
  protected autobind = true;

  scope: Scope = {
  };

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
  }

  public setStyles() {
    if (!this.scope.colHamburgerEl) {
      return;
    }
    const toolsWidth = this.scope.colToolsEl?.clientWidth || 0;
    this.scope.colHamburgerEl.style.minWidth = `${toolsWidth}px`;
  }

  protected initEventListeners() {
    this.setStyles = debounce(this.setStyles.bind(this));
    // window.addEventListener("resize", this.setStyles, { passive: true });
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(MMNavbarComponent.observedAttributes);
    this.initEventListeners();
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async afterAllBind() {
    super.afterAllBind();
    this.setStyles();
  }

  protected template() {
    return null;
  }
}
