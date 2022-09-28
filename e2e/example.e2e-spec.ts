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

test('validate the values in the product form', async ({ page }) => {
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

  // filling in the product form
  await page.locator('input[ng-reflect-placeholder="Title"]').fill('edited item title');
  await page.locator('textarea[ng-reflect-placeholder="Description"]').fill('edited item descripton');
  await page.locator('input[ng-reflect-placeholder="Price"]').fill('1234');
  await page.locator('input[ng-reflect-placeholder="Stock"]').fill('5678');
  await page.locator('button:has-text("Submit")').click();

  // asserting on the updated values entered from the product form
  await page.locator('text=edited item title');
  await page.locator('text=edited item description');
  await page.locator('text=edited item 1234');
  await page.locator('text=edited item 5678');
});

test('sorting the list by stock', async ({ page }) => {
  await page.goto('/');

  // login to the website
  await page.locator('input[type="email"]').fill('valid@email.com');
  await page.locator('input[type="password"]').fill('123');
  await page.locator('button:has-text("Submit")').click();
  await expect(page).toHaveURL('http://localhost:4200/products');

  await page.locator('text=Stock').click();

  let stocks = [];
  for (let i = 0; i < 15; i++) {
    let temp = await page.locator(`div[row-index="${i}"]`).nth(1).textContent(); // get all the product details
    temp = temp?.substring(0, temp.indexOf('$')) || null; // get all the details before the price
    stocks.push(Number(temp?.match(/[0-9]+$/))); // get the exact number of stocks
    if (i !== 0) {
      expect(stocks[i]).toBeGreaterThanOrEqual(stocks[i - 1]);
    }
  }
});
