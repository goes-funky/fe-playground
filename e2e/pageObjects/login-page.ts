import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly loginEmailaddress: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
      this.page = page;
      this.loginEmailaddress = page.locator('xpath=//*[@data-testid="email"]');
      this.loginPassword = page.locator('xpath=//*[@data-testid="password"]');
      this.loginButton = page.locator('xpath=//*[@data-testid="loginbutton"]');
    }
  
    async setLoginEmailAddress(emailAddress: string) {
      await this.loginEmailaddress.click();
      await this.loginEmailaddress.fill('');
      await this.loginEmailaddress.fill(emailAddress);
    }
  
    async setLoginpassword(password: string) {
      await this.loginPassword.click();
      await this.loginPassword.fill('');
      await this.loginPassword.fill(password);
    }
  
    async clickLoginbutton() {
      // await this.page.waitForTimeout(9000);
      await this.loginButton.click();
    }

    async loginWithCredentials(emailAddress: string, password: string) {
        await this.setLoginEmailAddress(emailAddress)
        await this.setLoginpassword(password)
        await this.clickLoginbutton()
        await this.page.waitForTimeout(9000);
    }
}
