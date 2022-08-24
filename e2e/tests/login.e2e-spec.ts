import { test, expect } from '@playwright/test';

import { user } from './testdata';
import { wrongUser } from './testdata';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});

test('homepage has App in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/App/);
});

test('login succes', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/App/);
});

test('User can login', async ({ page }) => {
  const homepage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homepage.open();
  await homepage.goToLoginPage();
  await loginPage.login(user.email, user.password);
});

test('Try incorrect mail address and get error', async ({ page }) => {
  const homepage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homepage.open();
  await homepage.goToLoginPage();
  await loginPage.enterParams(wrongUser.email, wrongUser.password);
  const userGetAnError = await loginPage.errorTextControl();
  await expect(page.locator('#mat-error-2')).toContainText('Email is')
  console.log(page.locator(loginPage.emailAddressError));
  expect(userGetAnError).toBeTruthy();
});

