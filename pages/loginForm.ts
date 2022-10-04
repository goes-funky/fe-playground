import { Locator, Page } from '@playwright/test';

export class Login {
  readonly page: Page;

  readonly emailInput: Locator;

  readonly passwordInput: Locator;

  readonly submitBtn: Locator;

  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[type="email"]');
    this.passwordInput = page.locator('[type="password"]');
    this.submitBtn = page.locator('[type="submit"]');
    this.form = page.locator('form');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitClick() {
    await this.submitBtn.click();
  }
}
