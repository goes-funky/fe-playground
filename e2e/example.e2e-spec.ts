import { expect, test } from '@playwright/test';

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});

test('double click on a row to open the product form', async ({ page }) => {
  await page.goto('/');

  // login to the website
  await page.locator('input[type="email"]').fill('valid@email.com');
  await page.locator('input[type="password"]').fill('123');
  await page.locator('button:has-text("Submit")').click();
  await expect(page).toHaveURL('http://localhost:4200/products');

  // double clicking on a row
  await page.locator('text=- Daal Masoor 500 grams').dblclick();
  // check that the the product form opens by checking its title
  await expect(page.locator('.mat-card-title')).toHaveText('Shipping Information');
});
