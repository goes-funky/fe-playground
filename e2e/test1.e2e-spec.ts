import { expect, test } from '@playwright/test';
test('test', async ({ page }) => {
    // Go to http://localhost:4200/products
    await page.goto('http://localhost:4200/products');
    // Go to http://localhost:4200/login
    await page.goto('http://localhost:4200/login');
    // Click input[type="email"]
    await page.locator('input[type="email"]').click();
    // Fill input[type="email"]
    await page.locator('input[type="email"]').fill('iris@test.com');
    // Press Tab
    await page.locator('input[type="email"]').press('Tab');
    // Fill input[type="password"]
    await page.locator('input[type="password"]').fill('123456');
    // Click button:has-text("Submit")
    await page.locator('button:has-text("Submit")').click();
    await expect(page).toHaveURL('http://localhost:4200/products');
    // Click text=Stock
    await page.locator('text=Stock').click();
  
  });