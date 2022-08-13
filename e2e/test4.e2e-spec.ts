import { test, expect } from '@playwright/test';
import LoginPage from "e2e/pages/loginPage";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();
  });

test.describe('Input validations for Title', () => {

test('correctly validates the inputs in the Product form: Title is null', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Brown Perfume').first().dblclick();
    // test scenario when title has no value
    await page.locator('#mat-input-2').fill('');
    await page.isDisabled('button:has-text("Submit")');
});

test('correctly validates the inputs in the Product form: Min number of allowed chars for Title', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Brown Perfume').first().dblclick();
    // one character
    await page.locator('#mat-input-2').fill('t');
    await page.isDisabled('button:has-text("Submit")');
    // two or more chars
    await page.locator('#mat-input-2').fill('tt');
    await page.locator('button:has-text("Submit")').click();


});
});

test.describe('Input validations for Description', () => {
    
test('correctly validates the inputs in the Product form: Description is null', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Genuine Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality').dblclick();
    await page.locator('textarea').fill('');
    await page.isDisabled('button:has-text("Submit")');

});
test('correctly validates the inputs in the Product form: Min number of allowed chars for Description', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Genuine Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality').dblclick();
      // one character
    await page.locator('textarea').fill('t');
    await page.isDisabled('button:has-text("Submit")');
    // two or more chars
    await page.locator('textarea').fill('tt');
    await page.locator('button:has-text("Submit")').click();

});
test('correctly validates the inputs in the Product form: Max number of allowed chars for Description', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Genuine Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality').dblclick();
    // more than 255 chars
    await page.locator('textarea').fill('thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest thisisatest ');
    await page.isDisabled('button:has-text("Submit")');
});
});

test('correctly validates the inputs in the Product form: Price', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Eau De Perfume Spray').dblclick();
    await page.locator('#mat-input-4').fill('');
    await page.locator('text=Shipping InformationTitle *Description *Price *Stock *CancelSubmit').click();
    await page.isVisible('text=Price is required');
    // or use "await page.isDisabled('button:has-text("Submit")');"

});
test('correctly validates the inputs in the Product form: Stock', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=Elbow Macaroni - 400 gm').first().dblclick();
    await page.locator('#mat-input-5').fill('');
    await page.locator('text=Shipping InformationTitle *Description *Price *Stock *CancelSubmit').click();
    await page.isVisible('text=Price is required');
    // or use "await page.isDisabled('button:has-text("Submit")');"
    
});