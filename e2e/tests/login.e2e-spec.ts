import { test, expect } from '@playwright/test';
const path = require('path');
import { LoginPage } from 'e2e/pageObjects/login-page';
import { ProductPage } from 'e2e/pageObjects/product-page';
import { takeScreenshotAfterTestFailed, getEmailAddress, getPassword } from '../utilities/utils'

test.describe('Check login functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotAfterTestFailed(page, testInfo, path.basename(__filename));
    });

    test('Able to successfully login', async ({ page }) => {
        const login = new LoginPage(page);
        const products = new ProductPage(page);
        await login.loginWithCredentials(getEmailAddress(), getPassword())
        const [productText, logoutText] = await products.getPanelInfo()
        await expect(productText).toEqual('Products')
        await expect(logoutText).toEqual('Logout') 
    });
});
