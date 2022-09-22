import { expect, Page, test } from '@playwright/test';
import { ProductPage } from '../pageObjectModel/Product.page'
import { LoginPage } from 'pageObjectModel/login.page';
import { ShippingInfo } from '../pageObjectModel/shippingInfo.page'

let page : Page

test.beforeAll( async({ browser }) => {
  page = await browser.newPage();
  const testUser = new LoginPage( 'test@example.com', '12341234', page) // use json to save test acc and call them here
  await testUser.login()
})

test.afterAll(async () => {
  await page.close();
});

test('Application supports double-clicking a row and opening the Product form to edit every property of a Product', async() => {
  //Click on a Product Row
  const productPg = new ProductPage(page)
  await productPg.clickProductRow()
  //modify everything in the popup-form and "save" it
  const popup = new ShippingInfo(page)
  await popup.fillShippingInfoForm('Tea Test', 'Test Data To Lorem Ipsum', '40', '23')
  //validate the form
  await productPg.clickProductRow()
  await popup.validateForm() 
})

test('Application supports double-clicking the Stock/Price cell to edit the value directly from the grid', async() => {
  
  const productPg = new ProductPage(page)
  await productPg.changeCellInputDblClick('stock', '333')
  await productPg.changeCellInputDblClick('price', '444.00')
})

test('Application supports sorting the list by Stock', async({ page }) => {
  const testUser = new LoginPage( 'test@example.com', '12341234', page) // have to figuere a way to handle this. If login is not in this scope this test fails due to elements not found
  await testUser.login()
  const productPg = new ProductPage(page)
  await productPg.isStockSorted()
  
})



/*
Write automated tests (using Playwright) to test that the application

1.supports double-clicking a row and opening the Product form to edit every property of a Product
2.supports double-clicking the Stock cell to edit the value directly from the grid
3.supports double-clicking the Price cell to edit the value directly from the grid
4.correctly validates the inputs in the Product form
5.supports sorting the list by Stock
*/

// PS: 2,3 are in the same test
// PS: 1,4 are in the same test