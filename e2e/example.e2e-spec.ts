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

test('double click on a stock cell and edit the value', async ({ page }) => {
  await page.goto('/');

  // login to the website
  await page.locator('input[type="email"]').fill('valid@email.com');
  await page.locator('input[type="password"]').fill('123');
  await page.locator('button:has-text("Submit")').click();
  await expect(page).toHaveURL('http://localhost:4200/products');

  // double clicking on the stock cell
  await page.locator('text=133').dblclick();
  await page.locator('[aria-label="Input Editor"]').fill('55');
  await page.locator('[aria-label="Input Editor"]').press('Enter');

  // check that the the product form opens by checking its title
  await expect(page.locator('text=55')).toHaveText('55');
});

test('double click on a price cell and edit the value', async ({ page }) => {
  await page.goto('/');

  // login to the website
  await page.locator('input[type="email"]').fill('valid@email.com');
  await page.locator('input[type="password"]').fill('123');
  await page.locator('button:has-text("Submit")').click();
  await expect(page).toHaveURL('http://localhost:4200/products');

  // double clicking on the stock cell
  await page.locator('text=$51').dblclick();
  await page.locator('[aria-label="Input Editor"]').fill('55');
  await page.locator('[aria-label="Input Editor"]').press('Enter');

  // check that the the product form opens by checking its title
  await expect(page.locator('text=55')).toHaveText('$55.00');
});