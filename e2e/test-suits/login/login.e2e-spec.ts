import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/loginPage.pom';


test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.loginUsingValidEmailAndPassword();
  await loginPage.verifyProductsPageIsOpened();
});
