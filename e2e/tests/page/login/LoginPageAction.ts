import {Page, TestInfo} from "@playwright/test";
import {SWAction} from "../../../src/action/sw-action";
import {LoginPageLocator} from "./LoginPageLocator";

export class LoginPageAction extends SWAction {
    public locator: LoginPageLocator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.locator = new LoginPageLocator(page, testInfo)
    }

    async goToLoginPage() {
        await this.page.goto("http://localhost:4200/login");
    }

    async enterEmail(email: string) {
        await this.locator.EmailTextInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.locator.PasswordTextInput.fill(password);
    }

    async clickSubmitButton() {
        await this.locator.SubmitButton.click();
    }
}