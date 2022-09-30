import { expect, test } from '@playwright/test';

test.beforeEach(async({page}) =>{ 
  await page.goto('/');
  await page.locator('input[type="email"]').fill('test@test.te');
  await page.locator('input[type="password"]').fill('testpass');
  await page.locator('button[type="submit"]').click();
})

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});

test('Authed page to have add to bag button and search field', async ({page}) => {
  await expect(page.locator('button.add-product')).toHaveCount(1);
  await expect(page.locator('input.filter-products')).toHaveCount(1);
})
