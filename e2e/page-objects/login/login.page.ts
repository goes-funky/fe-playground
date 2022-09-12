const { expect } = require("@playwright/test");
const locator = require('../login/login.locators.json'); 

export class LoginPage  {
    constructor(private page: any) {
        this.page = page;
    }

    async goto() {
        try {
            await this.page.goto("/");
            await expect(this.page).toHaveTitle(/Y42/);
            console.log('login page opened');
        }
        catch (error) {
            console.log('Exception in Login page', error);
        }
    }

    async login() {
        try {
            await this.page.waitForSelector(locator.Email.css);
            await this.page.fill(locator.Email.css, 'a@a.com');

            await this.page.waitForSelector(locator.Password.css);
            await this.page.fill(locator.Password.css, '123');

            await this.page.waitForSelector(locator.SubmitBtn.css);
            await this.page.locator(locator.SubmitBtn.css).click();

            await expect(this.page).toHaveTitle(/Y42/);
            console.log('Logged in successfully');
        }
        catch (error) {
            console.log('Exception in Login ', error);
        }
    }
  }
  