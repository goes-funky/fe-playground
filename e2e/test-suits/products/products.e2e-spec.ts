import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/products-page/productsPage.pom';
import { LoginPage } from '../../pages/login-page/loginPage.pom';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.loginUsingValidEmailAndPassword();
});


test('Verify editing first row values', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.editFirstRowValues();
  await productsPage.verifyFirstRowValues();
});

test('Verify editing first Stock and first Price values', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.editFirstStockValue();
  await productsPage.editFirstPriceValue();
  await productsPage.verifyStockValue();
  await productsPage.verifyPriceValue();
});


test('Verify sorting by stock', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.clickStockHeader();
  await productsPage.verifyStockAccordinglyOrdered();
});
