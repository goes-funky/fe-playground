import { test, expect } from '@playwright/test';
import { ProductPage } from '../pageObjectModel/Product.page'
import { LoginPage } from 'pageObjectModel/login.page';

test.describe.configure({mode: "serial"})

test('Application supports sorting the list by Stock', async({page}) => {
  // login
  const testUser = new LoginPage(page)
  await testUser.login()
  const productPg = new ProductPage(page)

  // go to products page
  await productPg.loadPage()  

  // click on Stock header cell to sort stock col
  await productPg.stockHeaderCell.isVisible()
  await productPg.stockHeaderCell.click()

  await page.waitForTimeout(2000)
  //expect stock col to be sorted (a<b)
  expect(await productPg.isStockSorted()).toBe(true)
})

/*
5.supports sorting the list by Stock
*/