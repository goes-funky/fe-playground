import { expect, test } from '@playwright/test';

test.use({ storageState: 'storageState.json' });

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});


test.only('2', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);

  await page.waitForTimeout(30000);
})


