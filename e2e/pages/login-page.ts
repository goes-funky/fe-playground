import type { Locator, Page } from 'playwright';
import { isVisible } from './home-page';

export class LoginPage {
  readonly page: Page;
  readonly loginEmailaddress: Locator;
  readonly loginPassword: Locator;
  readonly loginBtn: Locator;
  readonly emailAddressError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmailaddress = page.locator('#mat-input-0');
    this.loginPassword = page.locator('#mat-input-1');
    this.loginBtn = page.locator('text=Submit');
    this.emailAddressError = page.locator('#mat-error-2');
    this.passwordError = page.locator('#mat-error-4');
  }

  async login(email: string, password: string) {
    await this.page.type('#mat-input-0', email);
    await this.page.type('#mat-input-1', password);
    await this.page.click('text=Submit');
  }

  async setEmail(email: string) {
    await this.loginEmailaddress.click();
    await this.loginEmailaddress.fill(email);
  }

  async setPassword(password: string) {
    await this.loginPassword.click();
    await this.loginPassword.fill(password);
  }

  async sumbit() {
    await this.loginBtn.click();
  }

  async enterParams(email: string, password: string) {
    await this.page.type('#mat-input-0', email);
    await this.page.type('#mat-input-1', password);
  }

  async errorTextControl(): Promise<boolean> {
    return isVisible(this.page, '#mat-error-2');
  }
}