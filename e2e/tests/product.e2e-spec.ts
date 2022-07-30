import { test, expect } from '@playwright/test';
const path = require('path');
import { LoginPage } from 'e2e/pageObjects/login-page';
import { ProductPage } from 'e2e/pageObjects/product-page';
import { takeScreenshotAfterTestFailed, getEmailAddress, getPassword } from '../utilities/utils'

test.describe('Product Information functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotAfterTestFailed(page, testInfo, path.basename(__filename));
    });

    test.skip('Able to edit product form', async ({ page }) => {
        const title = 'y42 product one'
        const description = 'Description of y42 product one'
        const price = '10'
        const stock = '20'

        const login = new LoginPage(page);
        const products = new ProductPage(page);
        await login.loginWithCredentials(getEmailAddress(), getPassword())
        await products.setOverallProductDetails(title, description, price, stock);
        const [productTitleText, productDescriptionText, productStockText, productPriceText] = await products.getProductDetails()
        expect(productTitleText).toEqual(title)
        expect(productDescriptionText).toEqual(description)
        expect(productStockText).toEqual(stock)
        expect(productPriceText).toContain(price)
    });


    test('Able to update Stock from grid', async ({ page }) => {
        const stock = '200'

        const login = new LoginPage(page);
        const products = new ProductPage(page);
        await login.loginWithCredentials(getEmailAddress(), getPassword())
        await products.setProductStockFromGrid(stock);
        expect(await products.getProductStockFromGrid()).toContain(stock)
    });


    test('Able to update Price from grid', async ({ page }) => {
        const price = '109'

        const login = new LoginPage(page);
        const products = new ProductPage(page);
        await login.loginWithCredentials(getEmailAddress(), getPassword())
        await products.setProductPriceFromGrid(price);
        expect(await products.getProductPriceFromGrid()).toContain(price)
    });

    test("Snapshot Testing: Able to sort the list of Stock", async ({ page, browserName }) => {
        const login = new LoginPage(page);
        const products = new ProductPage(page);
        await login.loginWithCredentials(getEmailAddress(), getPassword())

        await products.sortStock();
        const sortedScreenshot = await page.screenshot({ path: 'screenshot.png', fullPage: true });
        expect(sortedScreenshot).toMatchSnapshot(`test-${browserName}.png`, { threshold: 0.2 });
    });
});
