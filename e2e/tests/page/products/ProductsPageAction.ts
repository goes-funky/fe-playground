import {Page, TestInfo} from "@playwright/test";
import {SWAction} from "../../../src/action/sw-action";
import {ProductsPageLocator} from "./ProductsPageLocator";

export class ProductsPageAction extends SWAction {
    public locator: ProductsPageLocator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.locator = new ProductsPageLocator(page, testInfo)
    }

    async doubleClickProductTitleRow() {
        await this.locator.ProductTitleRow.click({clickCount: 2});
    }

    async doubleClickProductPriceRow() {
        await this.locator.ProductPriceRow.click({clickCount: 2});
    }

    async doubleClickProductStockRow() {
        await this.locator.ProductStockRow.click({clickCount: 2});
    }

    async fillProductTitle(title: string) {
        await this.locator.ProductTitleTextInputLocator.fill(title);
    }

    async fillProductDescription(description: string) {
        await this.locator.ProductDescriptionTextInputLocator.fill(description);
    }

    async fillProductPrice(price: string) {
        await this.locator.ProductPriceTextInputLocator.fill(price);
    }

    async fillProductColumnPrice(price: string) {
        await this.locator.ProductPriceColumnTextInputLocator.fill(price);
        await this.page.keyboard.press('Enter');
    }

    async fillProductStock(stock: string) {
        await this.locator.ProductStockTextInputLocator.fill(stock);
    }

    async fillProductColumnStock(stock: string) {
        await this.locator.ProductStockColumnTextInputLocator.fill(stock);
        await this.page.keyboard.press('Enter');
    }

    async clickProductSubmitButton() {
        await this.locator.ProductSubmitButtonLocator.click();
    }

    async clickProductStockTab() {
        await this.locator.ProductStockTabLocator.click();
    }
}