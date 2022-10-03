import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsTable: Locator
  readonly row: Locator
  
  constructor(page: Page){
    this.page = page;
    this.productsTable = page.locator('[name="center"]');
    this.row = this.productsTable.locator('[role="row"]')
  }

  async openProductForm(name: string){
    await this.row.locator(':scope', { hasText: name }).dblclick()
  }
}