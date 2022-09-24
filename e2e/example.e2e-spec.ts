import { expect, test } from '@playwright/test';




test('Login', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Y42/);
  await page.locator('text=email').fill("Islam@yahoo.com")
  await page.locator('text=Password').fill("12")
  await page.locator('button').first().isEnabled()
  await page.locator('button').first().click()

  
});

test('Product form', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Y42/);
  await page.locator('text=email').fill("Islam@yahoo.com")
  await page.locator('text=Password').fill("12")
  await page.locator('button').first().isEnabled()
  await page.locator('button').first().click()
  await page.waitForSelector("text=- Daal Masoor 500 grams",{timeout:10000}); 
  const products = await page.$$('xpath =//*[@aria-colindex="1"]'); 
  await products.at(1)?.dblclick();
  await page.screenshot({ path: 'screenshot.png' });

});

test('Stock Editing', async ({ page }) => {


  await page.goto('/');
  await expect(page).toHaveTitle(/Y42/);
  await page.locator('text=email').fill("Islam@yahoo.com")
  await page.locator('text=Password').fill("12")
  await page.locator('button').first().isEnabled()
  await page.locator('button').first().click();
  await page.waitForSelector("text=- Daal Masoor 500 grams",{timeout:10000}); 
  const stocks = await page.$$('xpath =//*[@aria-colindex="4"]'); 
  const stock1 = await stocks.at(1)?.dblclick();
  await stocks.at(1)?.type('');
  await stocks.at(1)?.type('125');
  await page.keyboard.press('Enter');
  await page.screenshot({ path: 'screenshot.png' });
  //console.log(stocks.values()); 
  console.log( stocks.length); 
 
});


test('Price Editing', async ({ page }) => {

  await page.goto('/');
  await expect(page).toHaveTitle(/Y42/);
  await page.locator('text=email').fill("Islam@yahoo.com")
  await page.locator('text=Password').fill("12")
  await page.locator('button').first().isEnabled()
  await page.locator('button').first().click()
  await page.waitForSelector("text=- Daal Masoor 500 grams",{timeout:10000}); 
  const stocks = await page.$$('xpath =//*[@aria-colindex="5"]'); 
  const stock1 = await stocks.at(1)?.dblclick();
  await stocks.at(1)?.type('');
  await stocks.at(1)?.type('125');
  await page.keyboard.press('Enter');
  await page.screenshot({ path: 'screenshot.png' });
  //console.log(stocks.values()); 
  console.log( stocks.length); 
 
});

