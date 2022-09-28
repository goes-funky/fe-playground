import { test } from '@playwright/test';
import { LoginPage } from './pages/login';
import { ProductsUpdatePage } from './pages/productsUpdate';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.fillLoginForm('ae@gmail.com', 'admin');
});

test.describe('Update every property in the product list', () => {
  test('should allow user to edit every property in chosen product', async ({ page }) => {
    const productUpdate = new ProductsUpdatePage(page);
    await productUpdate.editProductValues(
      'Key Holder',
      'Test Product',
      'This is a test to see if value changes',
      '33.2',
      '1',
      true,
    );
  });

  test('should allow user to edit Stock directly from the Grid', async ({ page }) => {
    const productUpdate = new ProductsUpdatePage(page);
    await productUpdate.editStock('MacBook Pro', '5');
  });

  test('should allow user to edit Price directly from the Grid', async ({ page }) => {
    const productUpdate = new ProductsUpdatePage(page);
    await productUpdate.editPrice('MacBook Pro', '115');
  });
});

test.describe('Sort Products using (Stock,Price)', () => {

  test('should allow user to sort the products using the Stock column', async ({ page }) => {
    const productUpdate = new ProductsUpdatePage(page);
    await productUpdate.sortStockAscending();
    await productUpdate.sortStockDescending();
  });

  test('should allow user to sort the products using the Price column', async ({ page }) => {
    const productUpdate = new ProductsUpdatePage(page);
    await productUpdate.sortPriceAscending();
    await productUpdate.sortPriceDescending();
  });
});

test.describe('Validate inputs of Product Form', () => {

  test('should allow user to sort the products using the Stock column', async ({ page }) => {
    const productUpdate = new ProductsUpdatePage(page);
    await productUpdate.validateProductValuesForm("Key Holder");
  });
});
