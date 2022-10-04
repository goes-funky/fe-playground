import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ProductForm } from '../pages/productForm';
import { ProductsPage } from '../pages/productsPage';
import { Product } from '../pages/types';

test.use({ storageState: 'storageState.json' });

const mockProducts: Product = {
  limit: 30,
  products: [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/1/1.jpg',
        'https://dummyjson.com/image/i/products/1/2.jpg',
        'https://dummyjson.com/image/i/products/1/3.jpg',
        'https://dummyjson.com/image/i/products/1/4.jpg',
        'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
      ],
    },
    {
      id: 2,
      title: 'iPhone X',
      description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/2/1.jpg',
        'https://dummyjson.com/image/i/products/2/2.jpg',
        'https://dummyjson.com/image/i/products/2/3.jpg',
        'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
      ],
    },
    {
      id: 3,
      title: 'Samsung Universe 9',
      description: "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 0,
      brand: 'Samsung',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/3/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/3/1.jpg',
      ],
    },
    {
      id: 4,
      title: 'OPPOF19',
      description: 'OPPO F19 is officially announced on April 2021.',
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: -10,
      brand: 'OPPO',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/4/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/4/1.jpg',
        'https://dummyjson.com/image/i/products/4/2.jpg',
        'https://dummyjson.com/image/i/products/4/3.jpg',
        'https://dummyjson.com/image/i/products/4/4.jpg',
        'https://dummyjson.com/image/i/products/4/thumbnail.jpg',
      ],
    },
    {
      id: 5,
      title: 'Huawei P30',
      description: 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: -32,
      brand: 'Huawei',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/5/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/5/1.jpg',
        'https://dummyjson.com/image/i/products/5/2.jpg',
        'https://dummyjson.com/image/i/products/5/3.jpg',
      ],
    },
  ],
  skip: 0,
  total: 100,
};

test.beforeEach(async ({ page }) => {
  await page.route('**/api/products', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockProducts),
    });
  });
  const productsPage = new ProductsPage(page);

  await productsPage.goTo();
  await productsPage.openProductForm(mockProducts.products[0].title);
});

test('Product row should updated after set new data in Product form', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const productForm = new ProductForm(page);

  await expect(productForm.form, 'Product Form should be visible').toBeVisible();
  await expect(productForm.submitBtn, 'Submit button should be disabled').toHaveAttribute('disabled', 'true');
  const title = faker.lorem.words(4);
  const description = faker.lorem.words(4);
  const stock = faker.datatype.number(100);
  const price = faker.datatype.number(100);

  await productForm.fillTitle(title);
  await productForm.fillDescription(description);
  await productForm.fillStock(stock.toString());
  await productForm.fillPrice(price.toString());
  await expect(productForm.submitBtn, 'Submit button should be enabled').not.toHaveAttribute('disabled', 'true');

  await productForm.submitBtn.click();

  await expect(await productsPage.getRowByName(title), 'Product row contain description').toContainText(description);
  await expect(await productsPage.getRowByName(title), 'Product row contain stock').toContainText(stock.toString());
  await expect(await productsPage.getRowByName(title), 'Product row contain price').toContainText(price.toString());
});

test('all fields in Product form should be required', async ({ page }) => {
  // const productsPage = new ProductsPage(page);
  const productForm = new ProductForm(page);
  await productForm.fillTitle('');
  await productForm.form.click();
  await expect(productForm.titleInput, 'Title have validation message').not.toHaveAttribute('aria-invalid', 'false');

  await productForm.fillDescription('');
  await productForm.form.click();
  await expect(productForm.descriptionInput, 'Description have validation message').not.toHaveAttribute('aria-invalid', 'false');

  await productForm.fillStock('');
  await productForm.form.click();
  await expect(productForm.stockInput, 'Stock have validation message').not.toHaveAttribute('aria-invalid', 'false');
  await expect(productForm.form).toContainText('Stock is required');

  await productForm.fillPrice('');
  await productForm.form.click();
  await expect(productForm.priceInput, 'Price have validation message').not.toHaveAttribute('aria-invalid', 'false');
  await expect(productForm.form).toContainText('Price is required');

  await expect(productForm.submitBtn, 'Submit button should be disabled').toHaveAttribute('disabled', 'true');
  await expect(productForm.cancelBtn, 'Cancel button should be disabled').toHaveAttribute('disabled', 'true');
});

test('should not be possible to set negative numbers for stock and price', async ({ page }) => {
  // const productsPage = new ProductsPage(page);
  const productForm = new ProductForm(page);

  await productForm.fillStock('-1');
  await productForm.form.click();
  await expect(productForm.stockInput, 'Stock have validation message').not.toHaveAttribute('aria-invalid', 'false');

  await productForm.fillPrice('-2');
  await productForm.form.click();
  await expect(productForm.priceInput, 'Price have validation message').not.toHaveAttribute('aria-invalid', 'false');

  await expect(productForm.submitBtn, 'Submit button should be disabled').toHaveAttribute('disabled', 'true');
  await expect(productForm.cancelBtn, 'Cancel button should be disabled').toHaveAttribute('disabled', 'true');
});
