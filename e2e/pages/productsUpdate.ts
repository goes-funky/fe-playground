import { expect, Locator, Page } from '@playwright/test';

export class ProductsUpdatePage {
  readonly page: Page;
  readonly title: Locator;
  readonly editProductTitle: Locator;
  readonly description: Locator;
  readonly editProductDesc: Locator;
  readonly stock: Locator;
  readonly editProductStock: Locator;
  readonly stockAsc: Locator;
  readonly stockDesc: Locator;
  readonly priceAsc: Locator;
  readonly priceDesc: Locator;
  readonly price: Locator;
  readonly editProductPrice: Locator;
  readonly cancelButton: Locator;
  readonly submitButton: Locator;

  // Locaters in the page
  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator('text=Title');
    this.description = this.page.locator('text=Description');
    this.stock = this.page.locator('text=Stock');
    this.price = this.page.locator('text=Price');
    this.stockAsc = this.page.locator('.ag-sort-ascending-icon').nth(3);
    this.stockDesc = this.page.locator('.ag-sort-descending-icon').nth(3);
    this.priceAsc = this.page.locator('.ag-sort-ascending-icon').nth(4);
    this.priceDesc = this.page.locator('.ag-sort-descending-icon').nth(4);
    this.editProductTitle = this.page
      .locator('mat-bottom-sheet-container[role="dialog"] div:has-text("Title *")')
      .nth(4)
      .locator('input');
    this.editProductDesc = this.page
      .locator('mat-bottom-sheet-container[role="dialog"] div:has-text("Description *")')
      .nth(4)
      .locator('textarea');
    this.editProductPrice = this.page
      .locator('mat-bottom-sheet-container[role="dialog"] div:has-text("Price *")')
      .nth(4)
      .locator('input');
    this.editProductStock = this.page
      .locator('mat-bottom-sheet-container[role="dialog"] div:has-text("Stock *")')
      .nth(4)
      .locator('input');
    this.cancelButton = this.page.locator('text=Cancel');
    this.submitButton = this.page.locator('text=Submit');
  }

  // Checks element visibility
  async checkElementIsVisible(elm: Locator) {
    await elm.waitFor({ state: 'visible' });
    return true;
  }

  // Sorts products in Ascending order based on Stock
  async sortStockAscending() {
    let flag: boolean = true;

    while (flag) {
      await this.stock.click();

      if (await this.checkElementIsVisible(this.stockAsc)) {
        flag = false;
      }
    }
  }

  // Sorts products in Descending order based on Stock
  async sortStockDescending() {
    let flag: boolean = true;

    while (flag) {
      await this.stock.click();

      if (await this.checkElementIsVisible(this.stockDesc)) {
        flag = false;
      }
    }
  }

  // Sorts products in Ascending order based on Stock
  async sortPriceAscending() {
    let flag: boolean = true;

    while (flag) {
      await this.price.click();

      if (await this.checkElementIsVisible(this.priceAsc)) {
        flag = false;
      }
    }
  }

  // Sorts products in Descending order based on Stock
  async sortPriceDescending() {
    let flag: boolean = true;

    while (flag) {
      await this.price.click();

      if (await this.checkElementIsVisible(this.priceDesc)) {
        flag = false;
      }
    }
  }

  // Edit all values in a product and submit it
  async editProductValues(
    productName: string,
    title: string,
    description: string,
    price: string,
    stock: string,
    isSubmit: boolean,
  ) {
    const productRow = this.page.locator('text=' + productName);
    await productRow.dblclick();

    await this.editProductTitle.fill(title);
    await this.editProductDesc.fill(description);
    await this.editProductPrice.fill(price);
    await this.editProductStock.fill(stock);

    switch (isSubmit) {
      case false:
        await this.cancelButton.click();
        break;
      case true:
        await this.submitButton.click();
        break;
    }
  }

  // Edit Stock of a selected product directly from the grid
  async editStock(productName: string, newStock: string) {
    const productRow = this.page.locator('text=' + productName);
    const stockCell = this.page.locator('[role="row"]', { has: productRow }).locator(`[col-id='stock']`);

    await stockCell.dblclick();
    await stockCell.type(newStock);
    await this.page.keyboard.press('Enter');
  }

  // Edit Price of a selected product directly from the grid
  async editPrice(productName: string, newPrice: string) {
    const productRow = this.page.locator('text=' + productName);
    const stockCell = this.page.locator('[role="row"]', { has: productRow }).locator(`[col-id='price']`);

    await stockCell.dblclick();
    await stockCell.type(newPrice);
    await this.page.keyboard.press('Enter');
  }

  // Validate Product values in the form
  async validateProductValuesForm(productName: string) {
    const productRow = this.page.locator('text=' + productName);
    const productTitle = await this.page
      .locator('[role="row"]', { has: productRow })
      .locator(`[col-id='title']`)
      .innerText();
    const productDesc = await this.page
      .locator('[role="row"]', { has: productRow })
      .locator(`[col-id='description']`)
      .innerText();
    const productStock = await this.page
      .locator('[role="row"]', { has: productRow })
      .locator(`[col-id='stock']`)
      .innerText();
    const productPrice = await this.page
      .locator('[role="row"]', { has: productRow })
      .locator(`[col-id='price']`)
      .innerText();

    const trimmedPrice= productPrice.replace("$", "");
    await productRow.dblclick();


    expect(await this.editProductTitle.inputValue()).toBe(productTitle);
    expect(await this.editProductDesc.inputValue()).toBe(productDesc);
    expect(await this.editProductStock.inputValue()).toBe(productStock);
    expect(parseInt(await this.editProductPrice.inputValue())).toBe(parseInt(trimmedPrice));
  }
}
