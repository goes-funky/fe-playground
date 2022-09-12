
import { test } from '@playwright/test';
import { LoginPage }  from '../page-objects/login/login.page';
import { DashboardPage }  from '../page-objects/dashboard/dashboard.page';

test.describe('Complete test cases for the application', () => {

    test('Login page open', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    
    test('Login check', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login();
    });
    
    test('Row click', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login();
        await dashboardPage.SelectFirstRow();
    });
    
    test('Specific Row click', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login();
        await dashboardPage.SelectSpecificRow(5);
    });
    
    test('Double clicking stock to Edit', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login();
        await dashboardPage.SelectStock();
    });

    test('Double clicking price to Edit', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login();
        await dashboardPage.SelectPrice();
    });

    test('Stock Sorting', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login();
        await dashboardPage.StockSort();
    });

    test('inputs validation of product form', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login();
        await dashboardPage.SelectFirstRow();
        await dashboardPage.ValidatePriceField();
        await dashboardPage.ValidateStockField();
    });
    
});
