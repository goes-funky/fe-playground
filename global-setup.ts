import { chromium, FullConfig, expect } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200');
  await expect(page).toHaveTitle(/Y42/);

  await page.locator('[type="email"]').fill('sadas@addfas.com')
  await page.locator('[type="password"]').fill('sadas@addfas.com')
  await page.locator('text=Submit').click()

  await expect(page).toHaveURL('http://localhost:4200/products')
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;