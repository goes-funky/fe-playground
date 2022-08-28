import {Page, TestInfo} from "@playwright/test";

export interface ISWAssertion {
    page: Page
    testInfo: TestInfo
}