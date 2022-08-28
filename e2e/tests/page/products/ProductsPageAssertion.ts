import {expect, Page, TestInfo} from "@playwright/test";
import {SWAssertion} from "../../../src/assertion/sw-assertion";
import {ProductsPageLocator} from "./ProductsPageLocator";

export class ProductsPageAssertion extends SWAssertion {
    public selectors: ProductsPageLocator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.selectors = new ProductsPageLocator(page, testInfo)
    }

    async productTitleColumnContainText(text: string) {
        await expect(this.selectors.ProductTitleColumnLocator).toContainText(text);
    }

    async productDescriptionColumnContainText(text: string) {
        await expect(this.selectors.ProductDescriptionColumnLocator).toContainText(text);
    }

    async productStockColumnContainText(text: string) {
        await expect(this.selectors.ProductStockColumnLocator).toContainText(text);
    }

    async productPriceColumnContainText(text: string) {
        await expect(this.selectors.ProductPriceColumnLocator).toContainText(text);
    }

    async productStockColumnAfterSortContainText(text: string) {
        await expect(this.selectors.ProductStockAfterSort).toContainText(text);
    }
}