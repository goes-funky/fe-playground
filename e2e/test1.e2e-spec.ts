import { expect, test } from '@playwright/test';
import LoginPage from "e2e/pages/loginPage";


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('supports double-clicking a row and opening the Product form to edit every property of a Product', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.locator('text=3D Embellishment Art Lamp').dblclick();
    await page.locator('#mat-input-2').fill('test title');
    await page.locator('textarea').fill('test description');
    await page.locator('#mat-input-4').fill('10');
    await page.locator('#mat-input-5').fill('100');
    await page.locator('button:has-text("Submit")').click();
    await page.isVisible('text=test title');
    });
