import { Page } from '@playwright/test';

export class LoginPage {

  email = 'test@test.com';
  password = '1234';

  emailField = this.page.locator('//input[@type="email"]');
  passwordField = this.page.locator('//input[@type="password"]');
  loginButton = this.page.locator('//button[@type="submit"]');
  productPageTitle = this.page.locator('//mat-toolbar[text()="Menu"]');


  constructor(public readonly page: Page) {
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async loginUsingValidEmailAndPassword() {
    await this.enterEmail(this.email);
    await this.enterPassword(this.password);
    await this.clickLoginButton();
  }

  async verifyProductsPageIsOpened() {
    await this.productPageTitle.isVisible();
  }

}
