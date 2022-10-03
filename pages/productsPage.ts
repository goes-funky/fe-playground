import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsTable: Locator
  readonly row: Locator
  
  constructor(page: Page){
    this.page = page;
    this.productsTable = page.locator('[name="center"]');
    this.row = this.productsTable.locator('[role="row"]')
  }

  async goTo(){
    await this.page.goto('/products');
    await expect(this.productsTable, 'products table is visible').toBeVisible();
    await this.page.waitForLoadState();
  }

  async openProductForm(title: string){
    await this.row.locator(':scope', { hasText: title }).dblclick()
  }

  async editStock(title: string, value: number){
    await this.row.locator(':scope', { hasText: title }).locator('[col-id="stock"]').dblclick()
    await this.row.locator(':scope', { hasText: title }).locator('[col-id="stock"]').type(value.toString())
    await this.page.keyboard.press('Enter');
    await expect(this.row.locator(':scope', { hasText: title }).locator('[col-id="stock"]')).toContainText(value.toString());
  }
}