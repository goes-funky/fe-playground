import {Page, TestInfo} from "@playwright/test";
import {SWLocator} from "../../../src/locator/sw-locator";

export class LoginPageLocator extends SWLocator {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    public EmailTextInput = this.page.locator("#mat-input-0");
    public PasswordTextInput = this.page.locator("#mat-input-1");
    public SubmitButton = this.page.locator("mat-card-actions > button");
}