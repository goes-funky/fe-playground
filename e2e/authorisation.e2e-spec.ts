import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { Login } from '../pages/loginForm';
import { ProductsPage } from '../pages/productsPage';

test('Authorisation should be successfull', async ({ page }) => {
  await page.goto('/');

  const loginForm = new Login(page);

  const email = faker.internet.email();
  const password = faker.datatype.string(6);
  await loginForm.fillEmail(email);
  await loginForm.fillPassword(password);
  await loginForm.submitClick();

  const productPage = new ProductsPage(page);

  await expect(productPage.productsTable, 'products table is visible').toBeVisible();
});

test('Authorisation form should have validation for email field', async ({ page }) => {
  await page.goto('/');

  const loginForm = new Login(page);

  const emailInvalid1 = 'xsd_fsdf.com';
  const password = faker.datatype.string(6);

  await loginForm.fillPassword(password);

  await loginForm.fillEmail(emailInvalid1);
  await loginForm.form.click();
  await expect(loginForm.form, 'should not be possible to enter email without @').toContainText('Email is invalid');
  await expect(loginForm.submitBtn, 'submit button should be inactive').toHaveAttribute('disabled', 'true');

  await loginForm.fillEmail('');
  await loginForm.form.click();
  await expect(loginForm.form, 'email should be required filed').toContainText('Email is required');
  await expect(loginForm.submitBtn, 'submit button should be inactive').toHaveAttribute('disabled', 'true');
});

test('Authorisation form should have validation for password field', async ({ page }) => {
  await page.goto('/');

  const loginForm = new Login(page);

  const passwordInvalid1 = 'x';
  const email = faker.internet.email();

  await loginForm.fillEmail(email);

  await loginForm.fillPassword(passwordInvalid1);
  await loginForm.form.click();
  await expect(loginForm.form, 'should not be possible to enter short password').toContainText('Password is too short');
  await expect(loginForm.submitBtn, 'submit button should be inactive').toHaveAttribute('disabled', 'true');

  await loginForm.fillPassword('');
  await loginForm.form.click();
  await expect(loginForm.form, 'password should be required filed').toContainText('Password is required');
  await expect(loginForm.submitBtn, 'submit button should be inactive').toHaveAttribute('disabled', 'true');
});
