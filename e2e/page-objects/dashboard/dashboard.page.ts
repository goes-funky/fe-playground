const { expect } = require("@playwright/test");
const locator = require('../dashboard/dashboard.locators.json'); 

export class DashboardPage  {
    constructor(private page: any) {
        this.page = page;
    }

    async goto() {
        try {
            await this.page.goto("/products");
            await expect(this.page).toHaveTitle(/Y42/);
            console.log('Dashboard page opened');
        }
        catch (error) {
            console.log('Exception in Dashboard page opening', error);
        }
    }

    async SelectFirstRow() {
        try {
            await this.page.locator(locator.FirstRow.xpath).dblclick();
            console.log(' First Row selected');
        }
        catch (error) {
            console.log('Exception in SelectFirstRow', error);
        }
    }

    async SelectSpecificRow(rowNumber:number) {
        try {
            rowNumber = rowNumber - 1;
            await this.page.locator(`${locator.Row.xpath + rowNumber}']`).dblclick();
            await this.page.pause();
            const ProductCardTitle = await this.page.innerText(locator.ProductCardTitle.xpath)
            await expect(ProductCardTitle).toMatch('Shipping Information');
            console.log('Row selected');
        }
        catch (error) {
            console.log('Exception in SelectSpecificRow', error);
        }
    }

    async SelectStock() {
        try {
            await this.page.locator(locator.FirstProductStock.xpath).dblclick();
            console.log('stock selected');
            await this.EditStock(123);
        }
        catch (error) {
            console.log('Exception in SelectStock', error);
        }
    }

    async EditStock(quantity : number) {
        try {
            await this.page.type(locator.FirstProductStock.xpath , quantity.toString());
            console.log('stock edited');
        }
        catch (error) {
            console.log('Exception in EditStock', error);
        }
    }

    async SelectPrice() {
        try {
            await this.page.locator(locator.FirstProductPrice.xpath).dblclick();
            console.log('Price selected');
            await this.EditPrice(34);
        }
        catch (error) {
            console.log('Exception in SelectPrice', error);
        }
    }

    async EditPrice(quantity : number) {
        try {
            await this.page.type(locator.FirstProductPrice.xpath , quantity.toString());
            console.log('Price edited');
        }
        catch (error) {
            console.log('Exception in EditPrice', error);
        }
    }

    async StockSort() {
        try {
            await this.page.locator(locator.StockSort.css).click();
            console.log('Stock Sorted');
        }
        catch (error) {
            console.log('Exception in StockSort', error);
        }
    }

    async ValidatePriceField() {
        try {
            await this.page.locator(locator.ShippingInfo.PriceInput.css).dblclick();
            await this.page.keyboard.press('Backspace');
            await this.page.locator(locator.ProductCardTitle.xpath).click();
            const ErrorMsg = await this.page.$eval(locator.ShippingInfo.PriceInputError.css, function (node:any) {
                    return node.innerText;
                });
            await expect(ErrorMsg).toMatch('Price is required');
        }
        catch (error) {
            console.log('Exception in ValidatePriceFields', error);
        }
    }

    async ValidateStockField() {
        try {
            await this.page.locator(locator.ShippingInfo.StockInput.css).dblclick();
            await this.page.keyboard.press('Backspace');
            await this.page.locator(locator.ProductCardTitle.xpath).click();
            const ErrorMsg = await this.page.$eval(locator.ShippingInfo.StockInputError.css, function (node:any) {
                    return node.innerText;
                });
            await expect(ErrorMsg).toMatch('Stock is required');
        }
        catch (error) {
            console.log('Exception in ValidateStockFields', error);
        }
    }
  }
  