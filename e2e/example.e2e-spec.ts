import { expect, test } from '@playwright/test';

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('www.google.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});
