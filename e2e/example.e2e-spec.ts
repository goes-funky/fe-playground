import { expect, test } from '@playwright/test';
import { ProductForm } from '../pages/productForm';
import { ProductsPage } from '../pages/productsPage';

test.use({ storageState: 'storageState.json' });

const mockProduct = {
  products: [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
      "images": [
          "https://dummyjson.com/image/i/products/1/1.jpg",
          "https://dummyjson.com/image/i/products/1/2.jpg",
          "https://dummyjson.com/image/i/products/1/3.jpg",
          "https://dummyjson.com/image/i/products/1/4.jpg",
          "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
      ]
  }],
  skip: 0,
  total: 100,
  limit: 30,
}

test.beforeEach(async ({ page }) => {
  await page.route('**/api/products', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockProduct)
    })
  })
})



test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});


test.only('Product Form should open after dblclick on the product in the table', async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await productsPage.goTo();
  await productsPage.openProductForm(mockProduct.products[0].title);

  const productForm =  new ProductForm(page);
  await expect(productForm.form, 'Product Form should be visible').toBeVisible();
})

test('3', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goTo();
  await productsPage.editStock('iPhone X');
  await page.waitForTimeout(10000);
})



