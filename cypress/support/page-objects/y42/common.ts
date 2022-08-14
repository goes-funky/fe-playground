/// <reference types="cypress" />

import PageBase from './pageBase';

class Common extends PageBase {
  // chainable elements
  getHTML() {
    return cy.get(`html body`);
  }

  //-------------------------------------------------------------------------------------------------

  // methods
  visitLoginPage() {
    cy.visit(``);
  }

  /**
   *cy.type() has to be chained off a DOM element. So I created this function, to have a generic supported
   * DOM element (body).
   * @param keys string of key Or keys sequence.
   * See https://docs.cypress.io/api/commands/type#Arguments
   * See https://docs.cypress.io/api/commands/type#Type-a-key-combination
   * See https://docs.cypress.io/api/commands/type#Supported-Elements
   */
  sendKeys(keys: string) {
    this.getHTML().type(keys, { force: true });
  }
}

export let common = new Common();
