import {expect, Page, test} from "@playwright/test";
import {LoginSelectors} from "./helpers/login-selectors";

test('user login and logout', async ({ page }) => {
    await page.goto('/login');

    await login(page)

    await page.locator(LoginSelectors.LOGOUT).click()
    await page.waitForURL('**/login')
    await expect(page.url()).toContain('/login');
});

test('invalid email and password', async ({ page }) => {
    await page.goto('/login');

    //invalid email
    await page.locator(LoginSelectors.EMAIL).fill('ledjon');
    await page.keyboard.press('Tab');
    await expect(page.locator('mat-card-content .row:nth-child(1) mat-form-field mat-error')).toHaveText('Email is invalid');

    // short password
    await page.locator(LoginSelectors.PASSWORD).fill('1');
    await page.keyboard.press('Tab');
    await expect(page.locator('mat-card-content .row:nth-child(2) mat-form-field mat-error')).toHaveText('Password is too short');

    //disabled button
    await expect(page.locator(LoginSelectors.LOGIN)).toBeDisabled();
});

export async function login(page: Page) {
    // send keys email and make sure they are sent
    await page.locator(LoginSelectors.EMAIL).fill('ledjoncili@gmail.com');
    await expect(page.locator(LoginSelectors.EMAIL)).toHaveValue('ledjoncili@gmail.com');

    // send keys password and make sure they are sent
    await page.locator(LoginSelectors.PASSWORD).fill('password');
    await expect(page.locator(LoginSelectors.PASSWORD)).toHaveValue('password');

    //click login button and check we are in home screen
    await page.locator(LoginSelectors.LOGIN).click();
    await page.waitForURL('**/products')
    await expect(page.url()).toContain('/products');
}