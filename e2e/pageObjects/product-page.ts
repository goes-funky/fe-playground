import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
    
    readonly page: Page;
    readonly productPanel: string;
    readonly logoutPanel: string;
    readonly productTitle: string;
    readonly productStock: string;
    readonly productPrice: string;
    readonly popupProductTitle: Locator;
    readonly popupProductDescription: Locator;
    readonly popupProductPrice: Locator;
    readonly popupProductStock: Locator;
    readonly popupSubmitButton: Locator;
    readonly sortFromGrid: Locator;
    readonly waitForSort: Locator;
    readonly specificProductTitle: string;
    readonly specificProductDescription: string;
    readonly specificProductStock: string;
    readonly specificProductPrice: string;
    

    constructor(page: Page) {
      
      this.page = page;
      this.productPanel = 'xpath=//*[@data-testid="products"]'
      this.logoutPanel = 'xpath=//*[@data-testid="logout"]'

      this.productTitle = 'xpath=//*[@role="gridcell" and @col-id="title"]'
      this.productStock = 'xpath=//*[@role="gridcell" and @col-id="stock"]'
      this.productPrice = 'xpath=//*[@role="gridcell" and @col-id="price"]'

      this.specificProductTitle = `//*[contains(text(),"${globalThis.title}")]`
      this.specificProductDescription = `//div[contains(text(),"${globalThis.title}")]//following-sibling::div[@col-id="description"]`
      this.specificProductStock = `//div[contains(text(),"${globalThis.title}")]//following-sibling::div[@col-id="stock"]`
      this.specificProductPrice = `//div[contains(text(),"${globalThis.title}")]//following-sibling::div[@col-id="price"]`

      this.popupProductTitle = page.locator('xpath=//*[@data-testid="product_title"]')
      this.popupProductDescription = page.locator('xpath=//*[@data-testid="product_desc"]')
      this.popupProductPrice = page.locator('xpath=//*[@data-testid="product_price"]')
      this.popupProductStock = page.locator('xpath=//*[@data-testid="product_stock"]')
      this.popupSubmitButton = page.locator('BUTTON[type="submit"]')
      this.sortFromGrid = page.locator('//*[@aria-sort="none" and @col-id="stock"]')
      this.waitForSort = page.locator('//*[@aria-sort="ascending" and @col-id="stock"]')
    }

    async getPanelInfo() {
      await this.page.waitForTimeout(3000);
      return [await this.page.innerText(this.productPanel), await this.page.innerText(this.logoutPanel)]
    }

    async setOverallProductDetails(productTitle: string, productDescription: string, productPrice: string, productStock: string) {
      await this.page.dblclick(this.productTitle);
      await this.page.waitForTimeout(3000);

      await this.popupProductTitle.fill('');
      await this.popupProductTitle.fill(productTitle);

      await this.popupProductDescription.fill('');
      await this.popupProductDescription.fill(productDescription);

      await this.popupProductPrice.fill('');
      await this.popupProductPrice.fill(productPrice);

      await this.popupProductStock.fill('');
      await this.popupProductStock.fill(productStock);

      await this.popupSubmitButton.click()
      await this.page.waitForTimeout(3000);
    }

    async getProductDetails() {
      return [
        await this.page.locator(this.specificProductTitle).isVisible(),
        await this.page.innerText(this.specificProductDescription),
        await this.page.innerText(this.specificProductStock),
        await this.page.innerText(this.specificProductPrice)
      ]
    }

    async setProductStockFromGrid(stock: string) {
      await this.page.dblclick(this.productStock);
      await this.page.keyboard.press('Meta+A');
      await this.page.keyboard.press('Backspace');
      await this.page.keyboard.type(stock);
      await this.page.keyboard.press('Enter');
    }

    async setProductPriceFromGrid(price: string) {
      await this.page.dblclick(this.productPrice);
      await this.page.keyboard.press('Meta+A');
      await this.page.keyboard.press('Backspace');
      await this.page.keyboard.type(price);
      await this.page.keyboard.press('Enter');
    }

    async getProductStockFromGrid() {
      return await this.page.innerText(this.productStock)
    }

    async getProductPriceFromGrid() {
      return await this.page.innerText(this.productPrice)
    }

    async sortStock() {
      await this.sortFromGrid.click();
      await this.page.waitForTimeout(3000);
      await this.waitForSort.waitFor( {state: 'visible'})
    }
}
