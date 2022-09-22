import { Page, expect, Locator } from "@playwright/test";
import { User } from "./assets/user.model";

export class LoginPage {

    readonly user!: User;
    readonly baseUrl: string ; // should figure a cleaner way to do this as well
    readonly page : Page ; 
    public usernameInput : Locator;
    public passwordInput : Locator;
    public submitButton : Locator;

    constructor(public username:string, public password:string, page: Page) {
        this.page = page
        this.baseUrl = 'http://localhost:4200'
        this.username = username
        this.password = password
        this.user = {username: username, password: password} 
        this.usernameInput = page.locator('input[type="email"]')
        this.passwordInput = page.locator('input[type="password"]')
        this.submitButton = page.locator('button:has-text("Submit")')
    }

    /**
     * login
     */
    public async login() {

        await this.page.goto(this.baseUrl+'/login');
        let username = this.user.username
        let password = this.user.password

        await this.usernameInput.click()
        this.usernameInput.fill(username)

        await this.passwordInput.click()
        this.passwordInput.fill(password)

        await this.submitButton.click()
        await expect(this.page).toHaveURL(this.baseUrl+'/products');
        
    }
}