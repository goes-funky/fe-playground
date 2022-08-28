import {Page, TestInfo} from "@playwright/test";

export interface ISWAction {
    page: Page
    testInfo: TestInfo
}