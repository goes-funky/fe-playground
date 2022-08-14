/// <reference types="cypress" />

import { common } from 'cypress/support/page-objects/y42/common';
import { login_PO } from 'cypress/support/page-objects/y42/login-PO';
import { products_PO } from 'cypress/support/page-objects/y42/products-PO';

describe('Y42 test suite', function () {
  let rowNumber: number = 1;
  let cellNumber: number;
  let expected_title_pratial: string;
  let expected_description_pratial: string;
  let expected_price: string;
  let expected_stock: string;

  beforeEach(() => {
    common.visitLoginPage();
    login_PO.Login(Cypress.env(`email`), Cypress.env(`password`));
  });

  it('App should support double-clicking a row, opening, editing the Product form properties and correctly validate the inputs', () => {
    rowNumber = 1;
    expected_title_pratial = ` title edited`;
    expected_description_pratial = ` description edited`;
    expected_price = `21.50`;
    expected_stock = `134`;
    products_PO.dblClickAndEditSpecificRow(
      rowNumber,
      expected_title_pratial,
      expected_description_pratial,
      expected_price,
      expected_stock,
    );
    products_PO.getSpecificProductRow(rowNumber).should(`include.text`, expected_title_pratial);
    products_PO
      .getSpecificProductRow(rowNumber)
      .invoke(`text`)
      .should(`match`, new RegExp(`(.*)${expected_description_pratial}(.*)${expected_stock}(.*)`));
    products_PO.getSpecificProductRow(rowNumber).should(`include.text`, `$${expected_price}`);
  });

  it('App should support double-clicking the Stock cell to edit the value directly from the grid', () => {
    cellNumber = 4;
    expected_stock = `135`;
    products_PO.AssertSpecificHeaderCell(cellNumber, `col-id`, `stock`);
    products_PO
      .getSpecificProductRowCell(1, cellNumber)
      .dblclick()
      .clear()
      .type(expected_stock)
      .should(`have.attr`, `class`)
      .and(`match`, /cell-inline-editing/);
    products_PO.getSpecificProductRowCell(1, cellNumber).type(`{enter}`).should(`have.text`, expected_stock);
  });

  it('App should support double-clicking the Price cell to edit the value directly from the grid', () => {
    cellNumber = 5;
    expected_price = `22`;
    products_PO.AssertSpecificHeaderCell(cellNumber, `col-id`, `price`);
    products_PO
      .getSpecificProductRowCell(1, cellNumber)
      .dblclick()
      .clear()
      .type(expected_price)
      .should(`have.attr`, `class`)
      .and(`match`, /cell-inline-editing/);
    products_PO.getSpecificProductRowCell(1, cellNumber).type(`{enter}`).should(`have.text`, `$${expected_price}.00`);
  });

  it('App should support sorting the list by Stock', () => {
    products_PO.getHeaderCells().eq(3).click();
    let multipleStockValues: number[] = products_PO.getMultipleCellsOfStockColumn(5);
    cy.task(`log`, multipleStockValues).then(() => {
      expect(multipleStockValues[0]).to.be.lessThan(multipleStockValues[1]);
      expect(multipleStockValues[1]).to.be.lessThan(multipleStockValues[2]);
      expect(multipleStockValues[2]).to.be.lessThan(multipleStockValues[3]);
      expect(multipleStockValues[3]).to.be.lessThan(multipleStockValues[4]);
    });
  });
});
