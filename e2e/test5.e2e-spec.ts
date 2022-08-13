import { test, expect } from '@playwright/test';
import LoginPage from "e2e/pages/loginPage";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('supports sorting the list by Stock', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logInToY42('iris@test.com','123456');
    await expect(page).toHaveURL('http://localhost:4200/products');
    await expect(page.locator('.ag-cell-value.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height[comp-id="107"]')).toContainText('133');
    await page.locator('text=Stock').click();
    await page.locator('text=Stock').click();
    await expect(page.locator('.ag-cell-value.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height[comp-id="337"]')).toContainText('146');
    await page.locator('span[class="ag-sort-indicator-icon ag-sort-descending-icon"] span[role="presentation"]').isVisible();

});  
