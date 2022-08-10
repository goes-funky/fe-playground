import {expect, test} from "@playwright/test";
import {ProductSelectors} from "./helpers/product-selectors";
import {login} from "./01_login.e2e-spec";
import {LoginSelectors} from "./helpers/login-selectors";

test('edit products by form', async ({ page }) => {
    await page.goto('/');

    await login(page);

    //click first row
    await page.locator(ProductSelectors.getRowByIndex(0)).dblclick();

    await page.locator(ProductSelectors.getLocatorByFormControlName('Title')).fill('0000');
    await page.locator(ProductSelectors.getLocatorByFormControlName('description')).fill('desc');
    await page.locator(ProductSelectors.getLocatorByFormControlName('price')).fill('100');
    await page.locator(ProductSelectors.getLocatorByFormControlName('stock')).fill('10');

    await expect(page.locator(ProductSelectors.submitButtonLocator)).toBeEnabled();
    await page.locator(ProductSelectors.submitButtonLocator).click();

    //brand not included
    await ProductSelectors.checkFirstRowData(page,0,['0000', 'desc', '10', '$100.00']);
});

test('edit products by dblClick', async ({ page }) => {
    await page.goto('/products');

    await login(page);
    await ProductSelectors.dblClickAndEdit(page, 0, 'stock', '100');
    await ProductSelectors.dblClickAndEdit(page, 0, 'price', '100');
});

test('validate inputs product form', async ({ page }) => {
    await page.goto('/products');

    await login(page);

    await page.locator(ProductSelectors.getRowByIndex(1)).dblclick();

    await page.locator(ProductSelectors.getLocatorByFormControlName('Title')).fill('Test');
    await page.locator(ProductSelectors.getLocatorByFormControlName('description')).fill('');
    await page.locator(ProductSelectors.getLocatorByFormControlName('price')).fill('');
    await page.locator(ProductSelectors.getLocatorByFormControlName('stock')).fill('');
    await page.keyboard.press('Tab');


    await ProductSelectors.checkInputFormValidationError(page, 'price','Price is required')
    await ProductSelectors.checkInputFormValidationError(page, 'stock','Stock is required')
    await ProductSelectors.checkInputFormValidationError(page, 'description','')

    await page.locator(ProductSelectors.getLocatorByFormControlName('stock')).fill('');
    await page.keyboard.press('Tab');
    await ProductSelectors.checkInputFormValidationError(page, 'stock','')
});

test('check stock column sorting', async ({ page }) => {
    let stocks:number[]= [];
    await page.goto('/products');

    await login(page);

    await page.locator('div > div:nth-child(4) > div.ag-header-cell-comp-wrapper > div').click();
    await expect(page.locator('div > div:nth-child(4) > div.ag-header-cell-comp-wrapper > div')).toHaveClass(/ag-header-cell-sorted-asc/);
    const res = await page.$$('div.ag-cell-value[col-id=\'stock\']');

    console.log(res.length)
    for (let i=0; i <res.length;i++){
        await page.locator('div[row-index=\''+i+'\'] div.ag-cell-not-inline-editing[col-id=\'stock\']').scrollIntoViewIfNeeded();
        stocks.push(+await page.locator('div[row-index=\''+i+'\'] div.ag-cell-not-inline-editing[col-id=\'stock\']').innerText())
    }
    console.log(stocks);

    //array is sorted
    await expect(stocks.slice(1).every((item, i) => stocks[i] <= item)).toBeTruthy();

});

test('example with attributes', async ({ page }) => {
    await page.goto('/login');
    const webElement = await page.locator(LoginSelectors.EMAIL);

    //email and password are required
    await expect(webElement.evaluate(e => (e as HTMLInputElement).required)).toBeTruthy();
    await expect(page.locator(LoginSelectors.PASSWORD).evaluate(e => (e as HTMLInputElement).required)).toBeTruthy();

    //check type of password
    expect(await page.locator(LoginSelectors.PASSWORD).evaluate(e => (e as HTMLInputElement).type)).toEqual('password');
});

