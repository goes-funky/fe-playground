import {Page, TestInfo} from "@playwright/test";

export interface ISWLocator {
    page: Page
    testInfo: TestInfo
}