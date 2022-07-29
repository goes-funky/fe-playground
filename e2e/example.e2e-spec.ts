import { expect, test, Page } from '@playwright/test';
import { chromium } from "@playwright/test";

import {LoginPage} from '../src/Pages/loginpage.page'
import {loginData} from '../src/Data/login'


let login : LoginPage
import GridPage from '../src/Pages/grid.page'

let grid : GridPage
grid = new GridPage()

import {gridData} from '../src/Data/grid'


test.describe('feature foo', () => {
  let page: Page
  test.beforeEach(async ({browser }) => {
    browser = await chromium.launch(
        {
            headless:false
        }
      );
    page = await browser.newPage();
    login = new LoginPage(page)
    await page.goto('/');

    await login.doLogin(loginData.userone.email, loginData.userone.password)
  });
    
test('Edit Product Form and correctly validates the inputs in the Product form', async ({}) => {

  await page.dblclick(grid.row)
  
  await page.fill(grid.productTitle , gridData.title);
  await page.fill(grid.productDescription , gridData.description);
  await page.fill(grid.productPrice , gridData.price);
  await page.fill(grid.productStock , gridData.stock);
  await page.click(login.submitButton);

  await page.waitForTimeout(3000)
  let rowCount = 25;
  for(var i = 1; i <= rowCount; i++) {
    if(await page.innerText(`${grid.gridLocator}/div[${i}]/div[@col-id='title']`) == gridData.title) {
        expect ((await page.innerText(`${grid.gridLocator}/div[${i}]/div[@col-id='title']`)).toString()).toBe(gridData.title);
        expect ((await page.innerText(`${grid.gridLocator}/div[${i}]/div[@col-id='description']`)).toString()).toBe(gridData.description);
        expect ((await page.innerText(`${grid.gridLocator}/div[${i}]/div[@col-id='price']`)).toString()).toContain(gridData.price);
        expect ((await page.innerText(`${grid.gridLocator}/div[${i}]/div[@col-id='stock']`)).toString()).toBe(gridData.stock);
        break;
    }
  }
  await page.waitForTimeout(5000)
});

test('Edit Main Stock', async ({}) => {

  await page.dblclick(grid.mainStock)
  await page.waitForTimeout(3000)
  
  await page.type(grid.mainStock , gridData.stock);
  await page.keyboard.press("Enter")
  await page.waitForTimeout(5000)
});

test('Edit Main Price', async ({}) => {

  await page.dblclick(grid.mainPrice)
  await page.waitForTimeout(3000)
  
  await page.type(grid.mainPrice , gridData.price);
  await page.keyboard.press("Enter")
  await page.waitForTimeout(5000)
});

test('Sorting the Grid', async ({}) => {

  await page.click(grid.stock)
  await page.waitForTimeout(3000)
  
  await page.click(grid.stock);
  await page.waitForTimeout(5000)
});



});
