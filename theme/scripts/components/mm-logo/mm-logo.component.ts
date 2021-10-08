import { Component } from "@ribajs/core";

export interface Scope {}

export class MMLogoComponent extends Component {
  public static tagName = "mm-logo";
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

  protected connectedCallback() {
    super.connectedCallback();
    this.init(MMLogoComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template() {
    return null;
  }
}
