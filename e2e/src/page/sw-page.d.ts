import {Page, TestInfo} from "@playwright/test";

export interface ISWPage {
    page: Page
    testInfo: TestInfo
}