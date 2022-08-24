import type { Page } from 'playwright';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('http://localhost:4200/');
  }

  async goToLoginPage() {
    await this.page.goto('http://localhost:4200/login');
  }
}

export async function isVisible(page: Page, locator: string): Promise<boolean> {
  await page.waitForSelector(locator);
  return await page.isVisible(locator);
}