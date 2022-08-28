import {Page, TestInfo} from "@playwright/test";
import {SWPage} from "../../../src/page/sw-page";
import {LoginPageAction} from "./LoginPageAction";
import {LoginPageAssertion} from "./LoginPageAssertion";


export class LoginPage extends SWPage {
    public action: LoginPageAction;
    public assertion: LoginPageAssertion;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.action = new LoginPageAction(page, testInfo);
        this.assertion = new LoginPageAssertion(page, testInfo);
    }
}