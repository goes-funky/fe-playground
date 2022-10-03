import { Locator, Page } from "@playwright/test";

export class ProductForm{
  readonly page: Page
  readonly form: Locator

  constructor(page: Page){
    this.page = page;
    this.form = page.locator('[class="cdk-overlay-pane"]');
  }
}