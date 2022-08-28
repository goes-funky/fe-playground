import {Page, TestInfo} from "@playwright/test";

export interface ISWPageLoader {
    page: Page
    testInfo: TestInfo
}