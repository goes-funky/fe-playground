import { expect, Page } from '@playwright/test';

export class ProductsPage {
  title = '-title test';
  description = 'desc test';
  price = '100';
  stock = '200';
  newPrice = '150';
  newStock = '250';

  firstRow = this.page.locator('xpath=//div[@ref="eContainer"]/div[@row-index="0"]');
  titleField = this.page.locator('//input[@formcontrolname="title"]');
  descriptionField = this.page.locator('//textarea[@formcontrolname="description"]');
  priceField = this.page.locator('//input[@formcontrolname="price"]');
  stockField = this.page.locator('//input[@formcontrolname="stock"]');
  submitButton = this.page.locator('//button[@type="submit"]');
  firstTitle = this.page.locator('(//div[@role="gridcell" and @col-id="title"])[1]');
  firstDescription = this.page.locator('(//div[@role="gridcell" and @col-id="description"])[1]');
  firstStock = this.page.locator('(//div[@role="gridcell" and @col-id="stock"])[1]');
  secondStock = this.page.locator('(//div[@role="gridcell" and @col-id="stock"])[2]');
  firstPrice = this.page.locator('(//div[@role="gridcell" and @col-id="price"])[1]');
  stockHeader = this.page.locator('//div[@role="columnheader" and @col-id="stock"]//span[text()="Stock"]');
  firstRowStock = this.page.locator('//div[@row-index="0"]/div[@col-id="stock"]');
  secondRowStock = this.page.locator('//div[@row-index="1"]/div[@col-id="stock"]');
  allStock = this.page.locator('//div[@col-id="stock" and @role = "gridcell"]');


  constructor(public readonly page: Page) {
  }


  async doubleClickFirstRow() {
    await this.firstRow.dblclick();
  }

  async enterTitle(title: string) {
    await this.titleField.fill(title);
  }

  async enterDescriptionField(desc: string) {
    await this.descriptionField.fill(desc);
  }

  async enterPriceField(price: string) {
    await this.priceField.fill(price);
  }

  async enterStockField(stock: string) {
    await this.stockField.fill(stock);
  }


  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async clickStockHeader() {
    await this.stockHeader.isEnabled();
    await this.stockHeader.click();
  }

  async editFirstStockValue() {
    await this.firstStock.dblclick();
    await this.page.keyboard.type(this.newStock);
    await this.page.keyboard.press('Enter');
  }

  async editFirstPriceValue() {
    await this.firstPrice.dblclick();
    await this.page.keyboard.type(this.newPrice);
    await this.page.keyboard.press('Enter');
  }

  async editFirstRowValues() {
    await this.doubleClickFirstRow();
    await this.enterTitle(this.title);
    await this.enterDescriptionField(this.description);
    await this.enterPriceField(this.price);
    await this.enterStockField(this.stock);
    await this.submitButton.isEnabled();
    await this.clickSubmitButton();
  }

  async verifyFirstRowValues() {
    await expect(this.firstTitle).toHaveText(this.title);
    await expect(this.firstDescription).toHaveText(this.description);
    await expect(this.firstPrice).toContainText(this.price);
    await expect(this.firstStock).toHaveText(this.stock);
  }

  async verifyStockValue() {
    await expect(this.firstStock).toHaveText(this.newStock);
  }

  async verifyPriceValue() {
    await expect(this.firstPrice).toContainText(this.newPrice);
  }

  async verifyStockAccordinglyOrdered() {
    await this.firstRowStock.isVisible();
    await this.secondRowStock.isVisible();
    const firstValue = await this.firstRowStock.innerText();
    const secondValue = await this.secondRowStock.innerText();
    await expect(Number(firstValue)).toBeLessThan(Number(secondValue));
  }
}
