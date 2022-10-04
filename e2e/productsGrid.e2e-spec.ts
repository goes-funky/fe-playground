import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ProductsPage } from '../pages/productsPage';
import { Product } from '../pages/types';
import { sortingType } from '../pages/enums';

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
});

test('Price should be possible to change from the grid', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const priceValue = faker.datatype.number(1000);
  await productsPage.editPrice(mockProducts.products[0].title, priceValue);
});

test('Stock should be possible to change from the grid', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  const stockValue = faker.datatype.number(1000);
  await productsPage.editStock(mockProducts.products[0].title, stockValue);
});

test('products should sorted by asc and desc', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortByStock(sortingType.ASC, mockProducts.products);
  await productsPage.sortByStock(sortingType.DESC, mockProducts.products);
});
