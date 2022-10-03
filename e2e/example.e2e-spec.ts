import { expect, test } from '@playwright/test';
import { ProductForm } from '../pages/productForm';
import { ProductsPage } from '../pages/productsPage';

test.use({ storageState: 'storageState.json' });

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});


test.only('Product Form should open after dblclick on the product in the table', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);

  const productsPage = new ProductsPage(page);
  await productsPage.openProductForm('perfume Oil');

  const productForm =  new ProductForm(page);
  await expect(productForm.form, 'Product Form should be visible').toBeVisible();
})


