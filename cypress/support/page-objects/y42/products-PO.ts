/// <reference types="cypress" />

import PageBase from './pageBase';

class Products_PO extends PageBase {
  // chainable elements
  getHeaderCells() {
    return cy.get(`[role='columnheader']`);
  }

  getSpecificProductRow(rowNumber: number) {
    return cy.get(`[role='rowgroup'][ref='eContainer'] > [row-id]:nth-child(${rowNumber})`);
  }

  getSpecificProductRowCell(rowNumber: number, cellNumber: number) {
    return cy.get(
      `[role='rowgroup'][ref='eContainer'] > [row-id]:nth-child(${rowNumber}) > [role='gridcell']:nth-child(${cellNumber})`,
    );
  }

  /// Product form chainable elements
  getTitle() {
    return cy.get(`[role='dialog'] [formcontrolname='title']`);
  }

  getDescription() {
    return cy.get(`[role='dialog'] [formcontrolname='description']`);
  }

  getPrice() {
    return cy.get(`[role='dialog'] [formcontrolname='price']`);
  }

  getStock() {
    return cy.get(`[role='dialog'] [formcontrolname='stock']`);
  }

  getSubmitBtn() {
    return cy.get(`[role='dialog'] [type='submit']`);
  }

  //-------------------------------------------------------------------------------------------------

  // methods
  AssertSpecificHeaderCell(headerCellNumber: number, headerCellAttribute: string, attributeValue: string): any {
    this.getHeaderCells()
      .eq(headerCellNumber - 1)
      .should(`have.attr`, headerCellAttribute, attributeValue);
  }

  dblClickAndEditSpecificRow(
    rowNumber: number,
    title?: string,
    description?: string,
    price?: string,
    stock?: string,
  ): void {
    products_PO.getSpecificProductRow(rowNumber).dblclick(`topLeft`);
    this.getTitle().should(`be.visible`);
    if (title) {
      this.getTitle().type(title);
    } else {
    }
    if (description) {
      this.getDescription().type(description);
    } else {
    }
    if (price) {
      this.getPrice().clear().type(price);
    } else {
    }
    if (stock) {
      this.getStock().clear().type(stock);
    } else {
    }
    this.getSubmitBtn().click();
  }

  getMultipleCellsOfStockColumn(amountOfCells: number): number[] {
    this.AssertSpecificHeaderCell(4, `col-id`, `stock`);
    let stockCellsValues: number[] = [];
    for (let i = 0; i < amountOfCells; i++) {
      this.getSpecificProductRowCell(i + 1, 4)
        .invoke(`text`)
        .then(($text: string) => {
          stockCellsValues.push(Number($text));
        });
    }
    return stockCellsValues;
  }
}

export const products_PO = new Products_PO();
