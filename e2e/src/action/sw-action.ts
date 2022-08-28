import {Page, TestInfo} from "@playwright/test";
import {ISWAction} from "./sw-action.d";

export class SWAction implements ISWAction {

    private _page: Page
    private _testInfo: TestInfo

    constructor(page: Page, testInfo: TestInfo) {
        this._page = page
        this._testInfo = testInfo
    }

    public get page(): Page {
        return this._page
    }

    public set page(page: Page) {
        this._page = page
    }

    public get testInfo(): TestInfo {
        return this._testInfo;
    }

    public set testInfo(testInfo: TestInfo) {
        this._testInfo = testInfo;
    }
}