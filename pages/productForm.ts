import { Locator, Page } from '@playwright/test';

export class ProductForm {
  readonly page: Page;

  readonly form: Locator;

  readonly titleInput: Locator;

  readonly descriptionInput: Locator;

  readonly priceInput: Locator;

  readonly stockInput: Locator;

  readonly submitBtn: Locator;

  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('[class="cdk-overlay-pane"]');
    this.titleInput = this.form.locator('[ng-reflect-placeholder="Title"]');
    this.descriptionInput = this.form.locator('[data-placeholder="Description"]');
    this.priceInput = this.form.locator('[data-placeholder="Price"]');
    this.stockInput = this.form.locator('[data-placeholder="Stock"]');
    this.submitBtn = this.form.locator('[type="submit"]');
    this.cancelBtn = this.form.locator('button', { hasText: 'Cancel' });
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async fillDescription(text: string) {
    await this.descriptionInput.fill(text);
  }

  async fillStock(stock: string) {
    await this.stockInput.fill(stock);
  }

  async fillPrice(price: string) {
    await this.priceInput.fill(price);
  }
}
