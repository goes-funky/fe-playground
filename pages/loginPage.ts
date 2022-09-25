import { Page, expect } from '@playwright/test';
export default class LoginPage {
  constructor(public page: Page) {}

  userNameInput() {
    return this.page.locator("input[type='email']");
  }

  emailInput() {
    return this.page.locator('input[type="password"]');
  }

  async userLogsIn(email: string, password: string) {
    await this.userNameInput().fill(email);
    await this.emailInput().fill(password);
    await this.page.keyboard.press('Enter');
    await expect(this.page).toHaveURL('http://localhost:4200/products');
  }
}
