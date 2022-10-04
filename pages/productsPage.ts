import { expect, Locator, Page } from '@playwright/test';
import { sortingType } from './enums';
import { ProductsEntity } from './types';

export class ProductsPage {
  readonly page: Page;

  readonly productsTable: Locator;

  readonly row: Locator;

  readonly stockColumnHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTable = page.locator('[name="center"]');
    this.row = this.productsTable.locator('[role="row"]');
    this.stockColumnHeader = page.locator('[role="columnheader"]', { hasText: 'Stock' });
  }

  async goTo() {
    await this.page.goto('/products');
    await expect(this.productsTable, 'products table is visible').toBeVisible();
    await this.page.waitForLoadState();
  }

  async openProductForm(title: string) {
    await this.row.locator(':scope', { hasText: title }).dblclick();
  }

  async getRowByName(title: string) {
    return this.row.locator(':scope', { hasText: title });
  }

  async editStock(title: string, value: number) {
    await (await this.getRowByName(title)).locator('[col-id="stock"]').dblclick();
    await (await this.getRowByName(title)).locator('[col-id="stock"]').type(value.toString());
    await this.page.keyboard.press('Enter');
    await expect((await this.getRowByName(title)).locator('[col-id="stock"]')).toContainText(value.toString());
  }

  async editPrice(title: string, value: number) {
    await this.row.locator(':scope', { hasText: title }).locator('[col-id="price"]').dblclick();
    await this.row.locator(':scope', { hasText: title }).locator('[col-id="price"]').type(value.toString());
    await this.page.keyboard.press('Enter');
    await expect(this.row.locator(':scope', { hasText: title }).locator('[col-id="price"]')).toContainText(`$${value.toString()}`);
  }

  async sortByStock(sort: sortingType, products: ProductsEntity[]) {
    await this.stockColumnHeader.click();

    if (sort === sortingType.ASC) {
      await expect(this.stockColumnHeader).toHaveAttribute('aria-sort', 'ascending');
      const ascOrder = products.sort(({ stock: a }, { stock: b }) => a - b);

      /* eslint-disable no-await-in-loop */
      for (let i = 0; i >= ascOrder.length; i++) {
        await expect(await this.getRowByName(ascOrder[i].title)).toHaveAttribute('row-index', i.toString());
      }
    } else {
      await expect(this.stockColumnHeader).toHaveAttribute('aria-sort', 'descending');

      const descOrder = products.sort(({ stock: a }, { stock: b }) => b - a);
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i >= descOrder.length; i++) {
        await expect(await this.getRowByName(descOrder[i].title)).toHaveAttribute('row-index', i.toString());
      }
    }
  }
}
