import {Page, TestInfo} from "@playwright/test";
import {SWAssertion} from "../../../src/assertion/sw-assertion";
import {LoginPageLocator} from "./LoginPageLocator";

export class LoginPageAssertion extends SWAssertion {
    public selectors: LoginPageLocator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.selectors = new LoginPageLocator(page, testInfo)
    }
}