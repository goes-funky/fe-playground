import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/productPage';
import { user } from './testdata';
import { HomePage } from '../pages/home-page';

test('Product page check', async ({ page }) => {
  const homepage = new HomePage(page);
  const products = new ProductPage(page);

  await homepage.open();
  await new LoginPage(page).login(user.email, user.password);
  await expect(page).toHaveURL('http://localhost:4200/products');
  await expect(page.locator(products.productPage)).toContainText('Product');
});

test('Create an order', async ({ page }) => {
  const homepage = new HomePage(page);
  const products = new ProductPage(page);

  const title = 'Bursaspor Tshirt';
  const description = '2022-2023 season';
  const stock = '100';
  const price = '160';

  await homepage.open();
  await new LoginPage(page).login(user.email, user.password);

  await products.createOrder(title,description,stock,price);
});

test('Put stock value', async ({ page }) => {
  const homepage = new HomePage(page);
  const products = new ProductPage(page);

  const stockValue = '140';
  await homepage.open();
  await new LoginPage(page).login(user.email, user.password);
  await products.putStock(stockValue);
});

test('Put price value', async ({ page }) => {
  const homepage = new HomePage(page);
  const products = new ProductPage(page);

  const priceValue = '140';
  await homepage.open();
  await new LoginPage(page).login(user.email, user.password);
  await products.putPrice(priceValue);
});

test('Sort stock', async ({ page }) => {
  const homepage = new HomePage(page);
  const products = new ProductPage(page);

  await homepage.open();
  await new LoginPage(page).login(user.email, user.password);
  await products.sortStock();
});