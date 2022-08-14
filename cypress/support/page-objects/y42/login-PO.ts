/// <reference types="cypress" />

import { common } from './common';
import PageBase from './pageBase';

class Login_PO extends PageBase {
  // chainable elements
  getEmail() {
    return cy.get(`[type='email']`);
  }

  getPassword() {
    return cy.get(`[type='password']`);
  }

  getSubmitBtn() {
    return cy.get(`[type='submit']`);
  }

  //-------------------------------------------------------------------------------------------------

  // methods
  Login(email: string, password: string) {
    this.getEmail().type(email);
    this.getPassword().type(password);
    this.getSubmitBtn().should(`have.attr`, `ng-reflect-disabled`, `false`);
    this.getSubmitBtn().click();
  }
}

export const login_PO = new Login_PO();
