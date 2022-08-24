import type { Locator, Page } from 'playwright';
import { isVisible } from './home-page';

export class ProductPage {
  readonly page: Page;
  readonly productPage: string;
  readonly productBtn: string;
  readonly logoutBtn: string;
  readonly productTitle: string;
  readonly productBrand: string;
  readonly productDescription: string;
  readonly productStock: string;
  readonly productPrice: string;
  readonly productRating: string;
  readonly orderTitle: Locator;
  readonly orderDescription: Locator;
  readonly orderPrice: Locator;
  readonly orderStock: Locator;
  readonly submitButton: string;
  readonly firstOrder: string;
  readonly firstStock: string;
  readonly firstPrice: string;
  readonly sortIcon: string;
  readonly stockBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productPage = '//y42-root/y42-navigation/mat-sidenav-container/mat-sidenav-content[@class=\'mat-drawer-content mat-sidenav-content\']//h2[.=\'Products\']';
    this.productBtn = '[href=\'\\/products\'] .mat-list-item-content';
    this.logoutBtn = '[href=\'\\/logout\'] .mat-list-item-content';
    this.productTitle = '[ref] [role=\'columnheader\']:nth-of-type(1) .ag-header-cell-text';
    this.productBrand = '[ref] [role=\'columnheader\']:nth-of-type(2) .ag-header-cell-text';
    this.productDescription = '[ref] [role=\'columnheader\']:nth-of-type(3) .ag-header-cell-text';
    this.productStock = '[ref] [role=\'columnheader\']:nth-of-type(4) .ag-header-cell-text';
    this.productPrice = '[ref] [role=\'columnheader\']:nth-of-type(5) .ag-header-cell-text';
    this.productRating = '[ref] [role=\'columnheader\']:nth-of-type(6) .ag-header-cell-text';
    this.orderTitle = page.locator('xpath=//*[@data-test="product_title"]');
    this.orderDescription = page.locator('xpath=//*[@data-test="product_desc"]');
    this.orderPrice = page.locator('xpath=//*[@data-test="product_price"]');
    this.orderStock = page.locator('xpath=//*[@data-test="product_stock"]');
    this.submitButton = '[ng-reflect-align] [color] .mat-button-wrapper';
    this.firstOrder = '.ag-body-viewport .ag-center-cols-clipper .ag-row:nth-child(3) .ag-cell-value:nth-child(1)';
    this.firstStock = '.ag-body-viewport .ag-center-cols-clipper .ag-row:nth-child(4) .ag-cell-value:nth-child(3)';
    this.firstPrice = '.ag-body-viewport .ag-center-cols-clipper .ag-row:nth-child(4) .ag-cell-value:nth-child(4)';
    this.sortIcon = '.ag-header-container .ag-header-cell .ag-header-cell-label .ag-sort-indicator-icon';
    this.stockBtn = page.locator('[ref] [role=\'columnheader\']:nth-of-type(3) .ag-header-cell-text');
  }

  async createOrder(title: string, description: string, price: string, stock: string) {
    await this.page.dblclick(this.firstOrder);
    await this.page.waitForTimeout(8000);

    await this.orderTitle.fill('');
    await this.orderTitle.fill(title);

    await this.orderDescription.fill('');
    await this.orderDescription.fill(description);

    await this.orderPrice.fill('');
    await this.orderPrice.fill(price);

    await this.orderStock.fill('');
    await this.orderStock.fill(stock);

    await this.page.click(this.submitButton);

  }

  async getProductDetails() {
    return [
      await this.page.innerText(this.productTitle),
      await this.page.innerText(this.productDescription),
      await this.page.innerText(this.productStock),
      await this.page.innerText(this.productPrice)];
  }

  async putStock(stock: string) {
    await this.page.dblclick(this.firstStock);
    await this.page.keyboard.type(stock);
    await this.page.keyboard.press('Enter');
  }

  async putPrice(price: string) {
    await this.page.dblclick(this.firstPrice);
    await this.page.keyboard.type(price);
    await this.page.keyboard.press('Enter');
  }

  async sortStock() {
    await this.stockBtn.click();
    await this.page.waitForTimeout(5000);
    await this.page.isVisible(this.sortIcon);
  }
}