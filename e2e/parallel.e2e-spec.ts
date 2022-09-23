import { test, expect } from '@playwright/test';
import { ProductPage } from '../pageObjectModel/Product.page'
import { LoginPage } from 'pageObjectModel/login.page';
import { ShippingInfo } from '../pageObjectModel/shippingInfo.page'
import { BasePage } from '../pageObjectModel/Base.page'
import * as testData from '../pageObjectModel/assets/testData.json'


test('login once', async({ page, context }) => {
  const testUser = new LoginPage( page) 
  await testUser.login()
  await context.storageState({ path: 'storage/testuser.json' });
})

test.use({storageState: 'storage/testuser.json'}) 

test('Application supports double-clicking a row and opening the Product form to edit every property of a Product and correctly validates the form', async({page}) => {
  const basePg = new BasePage(page)
  const productPg = new ProductPage(page)
  const popup = new ShippingInfo(page)

  //Go to prods page
  await productPg.loadPage()

  //Double click on a row to open the popup
  await productPg.dblClickProductRow()

  //modify everything in the popup-form and "save" it
  await popup.fillForm(testData.testData1.title, testData.testData1.description, testData.testData1.price, testData.testData1.stock)
  await expect(popup.saveBtn).not.toHaveAttribute('disabled', 'true')
  await popup.saveBtn.click()
  await page.waitForTimeout(2000)

  //expected result: changes are shown properly on UI
  expect(await basePg.checkifValueExistsInCol("title", testData.testData1.title)).toBe(true)
  expect(await basePg.checkifValueExistsInCol("description", testData.testData1.description)).toBe(true)
  expect(await basePg.checkifValueExistsInCol("price", testData.testData1.price)).toBe(true)
  expect(await basePg.checkifValueExistsInCol("stock", testData.testData1.stock)).toBe(true)
  
  //Double click on a row to open the popup
  await productPg.dblClickProductRow()
  
  //expected result: Errors show on UI when form validations are met
  expect(await popup.verifyFormValidations()).toBe(true)
})


test('Application supports double-clicking the Stock/Price cell to edit the value directly from the grid', async({page}) => {
  const productPg = new ProductPage(page)

  //Go to prods page
  await productPg.loadPage()

  //Double click on stock-cell of a row to edit the value and expect the value to show on UI
  expect(await productPg.changeCellInputDblClick('stock', testData.testData2.stock)).toBe(true)
  
  //Double click on stock-cell of a row to edit the value and expect the value to show on UI
  expect(await productPg.changeCellInputDblClick('price', testData.testData2.price)).toBe(true)
})


/*
Write automated tests (using Playwright) to test that the application

1.supports double-clicking a row and opening the Product form to edit every property of a Product
2.supports double-clicking the Stock cell to edit the value directly from the grid
3.supports double-clicking the Price cell to edit the value directly from the grid
4.correctly validates the inputs in the Product form
*/

// PS: 1,4 are in the first test
// PS: 2,3 are in the second test