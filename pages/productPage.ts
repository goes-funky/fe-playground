import { Page, expect } from '@playwright/test';
export default class ProductPage {
  constructor(public page: Page) {}

  titleInput() {
    return this.page.locator("xpath=(//input[contains(@id,'mat-input')])[1]");
  }

  priceInput() {
    return this.page.locator("input[data-placeholder='Price']");
  }

  stockInput() {
    return this.page.locator("input[data-placeholder='Stock']");
  }

  descInput() {
    return this.page.locator("[data-placeholder='Description']");
  }

  cancelButton() {
    return this.page.locator('button', { hasText: 'Cancel' });
  }

  stockNumInGrid(title: string, stock: number) {
    return this.page.locator("//div[.='" + title + "']/..//div[.='" + stock + "']");
  }

  priceInGrid(title: string, price: string) {
    return this.page.locator("//div[.='" + title + "']/..//div[.='" + price + "']");
  }

  stockSortButton() {
    return this.page.locator("div[col-id='stock']").nth(0);
  }

  async selectAnyProductFromTitle(productName: string) {
    await this.page.waitForSelector("[col-id='title'][role='gridcell']");
    const titleList = await this.page.$$("[col-id='title'][role='gridcell']");
    for await (const titles of titleList) {
      if ((await titles.innerText()) === productName) {
        titles.dblclick();
        break;
      }
    }
  }

  async checkIfInputsEditable() {
    await expect(this.titleInput()).toBeEditable({ timeout: 4000 });
    await this.page.waitForTimeout(500);
    await expect(this.priceInput()).toBeEditable({ timeout: 4000 });
    await this.page.waitForTimeout(500);
    await expect(this.stockInput()).toBeEditable({ timeout: 4000 });
  }

  async selectAnyProductFromBrand(brandName: string) {
    await this.page.waitForSelector("[col-id='brand'][role='gridcell']");
    const brandList = await this.page.$$("[col-id='brand'][role='gridcell']");
    for await (const brands of brandList) {
      if ((await brands.innerText()) === brandName) {
        brands.dblclick();
        break;
      }
    }
  }

  async selectAnyProductFromDescription(desc: string) {
    await this.page.waitForSelector("[col-id='description'][role='gridcell']");
    const desList = await this.page.$$("[col-id='description'][role='gridcell']");
    for await (const des of desList) {
      if ((await des.innerText()) === desc) {
        des.dblclick();
        break;
      }
    }
  }

  async checkIfStockEditableFromGrig(title: string, stock: number) {
    await expect(this.stockNumInGrid(title, stock)).toBeEditable({ timeout: 4000 });
    await expect(this.stockNumInGrid(title, stock)).toBeEnabled({ timeout: 4000 });
  }

  async checkIfPriceEditableFromGrig(title: string, price: string) {
    await expect(this.priceInGrid(title, price)).toBeEditable({ timeout: 4000 });
    await expect(this.priceInGrid(title, price)).toBeEnabled({ timeout: 4000 });
  }

  async checkProductDetails(title: string, desc: string, price: string, stock: number) {
    if (price.includes('$')) {
      price = price.replace('$', '').replace(',', '').replace('.00', '');
    }
    await expect(this.titleInput()).toHaveValue(title);
    await expect(this.priceInput()).toHaveValue(price);
    await expect(this.stockInput()).toHaveValue(stock.toString());
    await expect(this.descInput()).toHaveValue(desc);
  }

  async checkIfStockCanBeSorted() {
    await expect(this.stockSortButton()).toHaveAttribute('aria-sort','none');

    //sort stock asc order
    await this.stockSortButton().click();
    await expect(this.stockSortButton()).toHaveAttribute('aria-sort','ascending');

    //sort stock desc order
    await this.stockSortButton().click();
    await expect(this.stockSortButton()).toHaveAttribute('aria-sort','descending');
  }
}
