import { test, expect } from '@playwright/test';
import LoginPage from "e2e/pages/loginPage";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();
  });

test('supports double-clicking the Price cell to edit the value directly from the grid', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=$20.00').first().dblclick();
    await page.locator('[aria-label="Input Editor"]').fill('8540');
    await page.locator('[aria-label="Input Editor"]').press('Enter');
    await page.isVisible('text=8540');
});