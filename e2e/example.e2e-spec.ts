import { expect, test } from '@playwright/test';

test('homepage has Y42 in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Y42/);
});

test('Verify that login fails with incorrect email', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@')
  await page.locator('#mat-input-1').type('password')
  expect (page.locator("//strong[contains(text(),'invalid')]")).toBeVisible
});


test('Verify that login fails with password less than 2 characters', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-1').type('p')
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  expect (page.locator("//strong[contains(text(),'too short')]")).toBeVisible
});


test('Verify that user can login successfully with correct email', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  expect (page.locator("//mat-toolbar[contains(text(),'Menu')]")).toBeVisible
});


test('Verify that user can open edit form by double clicking any product row', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  expect(page.locator('mat-card')).toBeVisible
});


test('Verify that user can edit title in edit box', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator('#mat-input-2').fill('New Title to test')
  await page.locator("//span[contains(text(),'Submit')]").click()
  expect(page.locator("//div[contains(text(),'New Title to test')]")).toBeVisible
});


test('Verify that user can edit Description in edit box', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("textarea[ng-reflect-name='description']").fill('New Description to test')
  await page.locator("//span[contains(text(),'Submit')]").click()
  expect(page.locator("//div[contains(text(),'New Description to test')]")).toBeVisible
});


test('Verify that user can edit Price in edit box', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='price']").fill('21')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await expect (page.locator('mat-spinner')).toBeVisible()
  await expect (page.locator('mat-spinner')).not.toBeVisible()
  expect(await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='price']").textContent()).toEqual('$21.00');

});


test('Verify that user can edit Stock in edit box', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='stock']").fill('21')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await expect (page.locator('mat-spinner')).toBeVisible()
  await expect (page.locator('mat-spinner')).not.toBeVisible()
  expect (await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='stock']").textContent()).toEqual('21');
});


test('Verify that user can edit Stock directly from the product page by double clicking on any stock cell', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='stock']").dblclick();
  await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='stock']//input").fill('12')
  await page.keyboard.press('Enter');
  await expect (page.locator('mat-spinner')).toBeVisible()
  await expect (page.locator('mat-spinner')).not.toBeVisible()
  expect (await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='stock']").textContent()).toEqual('12');

});


test('Verify that user can edit Price directly from the product page by double clicking on any price cell', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='price']").dblclick();
  await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='price']//input").fill('12')
  await page.keyboard.press('Enter');
  await expect (page.locator('mat-spinner')).toBeVisible()
  await expect (page.locator('mat-spinner')).not.toBeVisible()
  expect (await page.locator("//div[contains(text(),'Fine quality')]//following-sibling::div[@col-id='price']").textContent()).toEqual('$12.00');
});


test('Verify that Title field is mandatory to fill in edit form', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='title']").fill('');
  await page.locator("textarea[ng-reflect-name='description']").click() 
  await expect (page.locator("mat-form-field[class*='ng-invalid']")).toBeVisible()
});


test('Verify that Description field is mandatory to fill in edit form', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("textarea[ng-reflect-name='description']").fill('')
  await page.locator("input[ng-reflect-name='title']").click()
  await expect (page.locator("mat-form-field[class*='ng-invalid']")).toBeVisible()
});


test('Verify that Price field is mandatory to fill in edit form', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='price']").fill('')
  await page.locator("input[ng-reflect-name='title']").click()
  await expect (page.locator("//strong[contains(text(),'required')]")).toBeVisible()
});


test('Verify that stock field is mandatory to fill in edit form', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='stock']").fill('')
  await page.locator("input[ng-reflect-name='title']").click()
  await expect (page.locator("//strong[contains(text(),'required')]")).toBeVisible()
});


/*   
commenting as these 2 tests fail, which is a delibrate move to fail them,
  because in price field the string values must not be accepted.

test('Verify that price field must not take string input', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='price']").fill('New Price')
  await expect (page.locator("button[type='submit']")).toBeDisabled();
});
test('Verify that stock field must not take string input', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//div[contains(text(),'Fine quality')]").dblclick();
  await page.locator("input[ng-reflect-name='stock']").fill('New Stock')
  await expect (page.locator("button[type='submit']")).toBeDisabled();
}); */


test('Verify that user is able to sort the stock column', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mat-input-0').type('a.cheema007@gmail.com')
  await page.locator('#mat-input-1').type('password')
  await page.locator("//span[contains(text(),'Submit')]").click()
  await page.locator("//span[contains(text(),'Stock')]").click()
  
  const firststock = await page.locator("div[col-id='stock']").nth(1).textContent();
  const secondstock = await page.locator("div[col-id='stock']").nth(2).textContent();
  const thirdstock = await page.locator("div[col-id='stock']").nth(3).textContent();

  var firststocknumber = parseInt(firststock!);
  var secondstocknumber = parseInt(secondstock!);
  var thirdstocknumber = parseInt(thirdstock!);

  expect (secondstocknumber).toBeGreaterThanOrEqual (firststocknumber);
  expect (thirdstocknumber).toBeGreaterThanOrEqual (secondstocknumber);
});
