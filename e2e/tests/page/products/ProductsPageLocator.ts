import {Page, TestInfo} from "@playwright/test";
import {SWLocator} from "../../../src/locator/sw-locator";

export class ProductsPageLocator extends SWLocator {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }
    public ProductTitleRow = this.page.locator("text=- Daal Masoor 500 grams");
    public ProductStockRow = this.page.locator("text=133");
    public ProductPriceRow =  this.page.locator("text=20.00").first();

    public ProductTitleColumnLocator = this.page.locator(".ag-row-focus > div:nth-child(1)");
    public ProductDescriptionColumnLocator = this.page.locator(".ag-row-focus > div:nth-child(3)");
    public ProductStockColumnLocator = this.page.locator(".ag-row-focus > div:nth-child(4)");
    public ProductPriceColumnLocator = this.page.locator(".ag-row-focus > div:nth-child(5)");

    public ProductTitleTextInputLocator =  this.page.locator("input[formcontrolname='title']");
    public ProductDescriptionTextInputLocator =  this.page.locator("textarea");
    public ProductPriceTextInputLocator =  this.page.locator("input[formcontrolname='price']");
    public ProductStockTextInputLocator =  this.page.locator("input[formcontrolname='stock']");
    public ProductSubmitButtonLocator = this.page.locator("button:has-text('Submit')");

    public ProductPriceColumnTextInputLocator = this.page.locator("[aria-label='Input Editor']");
    public ProductStockColumnTextInputLocator = this.page.locator("[aria-label='Input Editor']");

    public ProductStockTabLocator = this.page.locator("text=Stock");

    public ProductStockAfterSort = this.page.locator("[comp-id='93'] [aria-colindex='4']");
}