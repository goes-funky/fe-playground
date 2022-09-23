import { Page, expect, Locator } from "@playwright/test";
import { User } from "./assets/user.model";
import * as testUser from "./assets/testAccounts.json"

export class LoginPage {

    readonly user: User;
    readonly page : Page ; 
    readonly usernameInput : Locator;
    readonly passwordInput : Locator;
    readonly submitButton : Locator;

    constructor(page: Page) {
        this.page = page
        this.user = testUser.testUser1
        this.usernameInput = page.locator('input[type="email"]')
        this.passwordInput = page.locator('input[type="password"]')
        this.submitButton = page.locator('button:has-text("Submit")')
    }

    /**
     * login as testUser1
     */
    async login() {
        await this.page.goto('/login');

        await this.usernameInput.click()
        this.usernameInput.fill(this.user.username)

        await this.passwordInput.click()
        this.passwordInput.fill(this.user.password)

        await this.submitButton.click()
        await expect(this.page).toHaveURL('/products');
    }
}