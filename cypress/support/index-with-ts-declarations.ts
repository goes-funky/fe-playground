// ***********************************************************
// This example support/index-with-ts-declarations.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath');

declare global {
  namespace Cypress {
    interface Chainable {
      //type declaration for the package command "xpath" to avoid typescript
      //error [Property 'xpath' does not exist on type 'cy & EventEmitter'.], as this "xpath"
      //command is taken from an external npm package (cypress-xpath) and Not included in the
      //cypress package
      xpath(xpathSelector: string): Chainable<any>; // if you type any type
      // other than "any" or "string" (i.e. Element), you will Not be able to use "cy.log" with the output of this
      // function, because you will get the error [Type 'Element' is not assignable to type 'string'].
      // So in case you will use typescript, you have No choice, but to put "any"
    }
  }
}
