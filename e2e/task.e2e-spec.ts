import { test, expect } from '../fixture/objects';

const email = 'alp@gmail.com';
const password = '1234';
const productName = 'MacBook Pro';
const brandName = 'APPle';
const desc = 'MacBook Pro 2021 with mini-LED display may launch between September, November';
const stock = 83;
const price = "$1,749.00"

test('Task solution', async ({ page, loginPage, productPage }) => {
  //user navigates to login page
  await page.goto('/login');

  //user logs in with the credentials
  await loginPage.userLogsIn(email, password);

  //user selects a product from title
  await productPage.selectAnyProductFromTitle(productName);

  //user should be able to edit product details
  await productPage.checkIfInputsEditable();
  await productPage.cancelButton().click({ timeout: 3000 });

  //user selects a product from brand
  await productPage.selectAnyProductFromBrand(brandName);

  //user should be able to edit product details
  await productPage.checkIfInputsEditable();
  await productPage.cancelButton().click({ timeout: 3000 });

  //user selects a product from description
  await productPage.selectAnyProductFromDescription(desc);

  //user should be able to edit product details
  await productPage.checkIfInputsEditable();
  await productPage.cancelButton().click({ timeout: 5000 });

  //stock in grid should be editable
  await productPage.checkIfStockEditableFromGrig(productName, stock);

  //price in grid should be editable
  await productPage.checkIfPriceEditableFromGrig(productName, price);

  //user validates the inputs in the `Product form`
  await productPage.checkProductDetails(productName,desc,price,stock)

  //user checks if stock can be sorted
  await productPage.checkIfStockCanBeSorted()

});
