import {expect, test} from '@playwright/test';
import {PageLoader} from "./page/PageLoader";

test.beforeEach(async ({ page }, testInfo) => {
    let pages: PageLoader = new PageLoader(page, testInfo);
    await pages.loginPage.action.goToLoginPage();
    await pages.loginPage.action.enterEmail("abdullahdeliogullari@yaani.com");
    await pages.loginPage.action.enterPassword("Istanbul1996");
    await pages.loginPage.action.clickSubmitButton();
});

test.describe.serial('Products Information Page', () => {
    test('Open and Edit Product Form Successfully', async ({page}, testInfo) => {
        let pages: PageLoader = new PageLoader(page, testInfo);
        await pages.productsPage.action.doubleClickProductTitleRow();
        await pages.productsPage.action.fillProductTitle("1C Avon Cosmetics");
        await pages.productsPage.action.fillProductDescription("Avon Product Description");
        await pages.productsPage.action.fillProductPrice("10");
        await pages.productsPage.action.fillProductStock("20");
        await pages.productsPage.action.clickProductSubmitButton();
        await pages.productsPage.assertion.productTitleColumnContainText("Avon Cosmetics");
        await pages.productsPage.assertion.productDescriptionColumnContainText("Avon Product Description");
        await pages.productsPage.assertion.productPriceColumnContainText("10");
        await pages.productsPage.assertion.productStockColumnContainText("20");
    });

    test('Edit Product Price Cell Successfully', async ({page}, testInfo) => {
        let pages: PageLoader = new PageLoader(page, testInfo);
        await pages.productsPage.action.doubleClickProductPriceRow();
        await pages.productsPage.action.fillProductColumnPrice("50");
        await pages.productsPage.assertion.productPriceColumnContainText("50");
    });

    test('Edit Product Stock Cell Successfully', async ({page}, testInfo) => {
        let pages: PageLoader = new PageLoader(page, testInfo);
        await pages.productsPage.action.doubleClickProductStockRow();
        await pages.productsPage.action.fillProductColumnStock("100");
        await pages.productsPage.assertion.productStockColumnContainText("100");
    });

    test('Sort Product Stock Cell Successfully', async ({page}, testInfo) => {
        let pages: PageLoader = new PageLoader(page, testInfo);
        await pages.productsPage.action.clickProductStockTab();
        await pages.productsPage.assertion.productStockColumnAfterSortContainText("7");
    });
});