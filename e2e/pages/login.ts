import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('text=Email');
    this.passwordInput = page.locator('text=Password');
    this.submitButton = page.locator('button', { hasText: 'Submit' });
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.submitButton.click();
  }
}
