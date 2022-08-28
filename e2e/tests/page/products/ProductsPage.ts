import {Page, TestInfo} from "@playwright/test";
import {SWPage} from "../../../src/page/sw-page";
import {ProductsPageAction} from "./ProductsPageAction";
import {ProductsPageAssertion} from "./ProductsPageAssertion";


export class ProductsPage extends SWPage {
    public action: ProductsPageAction;
    public assertion: ProductsPageAssertion;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.action = new ProductsPageAction(page, testInfo);
        this.assertion = new ProductsPageAssertion(page, testInfo);
    }
}