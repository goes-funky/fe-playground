import { chromium, expect, test } from '@playwright/test';
import ChangeData from 'page/productsForm';
import LoginPage from 'page/loginPage';
import { setAriaRowIndex } from 'ag-grid-community/dist/lib/utils/aria';


let login: LoginPage;
let common: ChangeData;
beforeAll(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();


test('Login positive_TC01', async ({ page }) => {

    await page.goto('http://localhost:4200/login');
 //   await page.goto('/');
  
    //Fill the email and password and submit the button
   // expect(page.url()).toBe("http://localhost:4200/login");
    await login.enterEmail('xhoni@gmail.com');
    await login.enterPassword('Test1234');
    await login.clickLoginBtn();
    expect(page.url()).toBe("http://localhost:4200/products");
})
    test('Checking form_TC02', async ({ page }) => {

    //double click the first row to open the product form
    await common.doubleClickTheFirstRow();
    //check if form is visible now 
    await common.isProductFormVisible();
    //edit all the propertys of the form 
    await common.changeProductTitle("test");
    await common.changeProductDescription("test");
    await common.changeProductPrice("10");
    await common.changeProductStock("10");
    await common.clickSubmitBtn();
    //supports double-clicking the Stock cell to edit the value directly from the grid
    await common.doubleClickTheStockCell();
    const join= page.locator('xpath=//div[@comp-id="1608"]');

    console.log(await join.getAttribute("placeholder") );
    expect(join).toHaveAttribute("placeholder","2");
    //supports double-clicking the Price cell to edit the value directly from the grid
    await common.doubleClickThePriceCell();
    const add= page.locator('xpath=//div[@comp-id="1883"]');

    console.log(await add.getAttribute("placeholder") );
    expect(add).toHaveAttribute("placeholder","2");
   // correctly validates the inputs in the Product form
    const ele1=page.locator('xpath=//input[@data-placeholder="Title"]');
    console.log(await ele1.getAttribute("placeholder"));
    expect(ele1).toHaveAttribute("placeholder","test");

    const ele2=page.locator('xpath=//input[@data-placeholder="Description"]');
    console.log(await ele2.getAttribute("placeholder"));
    expect(ele2).toHaveAttribute("placeholder","test");

    const ele3=page.locator('xpath=//input[@data-placeholder="Price"]');
    console.log(await ele3.getAttribute("placeholder"));
    expect(ele3).toHaveAttribute("placeholder","10");

    const ele4=page.locator('xpath=//input[@data-placeholder="Stock"]');
    console.log(await ele4.getAttribute("placeholder"));
    expect(ele4).toHaveAttribute("placeholder","10");

   // supports sorting the list by Stock
   await common.clickStockHeader();
    
   await browser.close();
})
});