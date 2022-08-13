import { first, lastValueFrom, take } from 'rxjs';
import { productHttpServiceMock } from './mocks';
import { ProductService } from './product.service';
import { ProductHttpService } from './product-http.service';
import { Product } from '../models';
import { fakeAsync, flush, tick } from '@angular/core/testing';

describe('ProductService', () => {
  let httpServiceMock: ProductHttpService;
  let service: ProductService;

  describe('getAll', () => {

    beforeEach(() => {
      httpServiceMock = productHttpServiceMock as ProductHttpService;
      service = new ProductService(httpServiceMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should set loading$ to true at the start and set to false in the end', async () => {
      const loadingSpy = jest.spyOn(service['loading$$'], 'next');
      expect(loadingSpy).not.toHaveBeenCalled();
      await lastValueFrom(service.getAll());
      expect(loadingSpy).toHaveBeenNthCalledWith(1, true);
      expect(loadingSpy).toHaveBeenNthCalledWith(2, false);
    });

    it('should update products$ with products from api', async () => {
      await expect(lastValueFrom(service.products$.pipe(first()))).resolves.toEqual([]);
      await lastValueFrom(service.getAll());
      const expectedResult = await lastValueFrom(httpServiceMock.getAll());
      await expect(lastValueFrom(service.products$.pipe(first()))).resolves.toEqual(expectedResult.products);
    });
  });

  describe('addProduct', () => {

    beforeEach(() => {
      httpServiceMock = productHttpServiceMock as ProductHttpService;
      service = new ProductService(httpServiceMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    const product: Product = {
      "id": 4,
      "title": "OPPOF19",
      "description": "OPPO F19 is officially announced on April 2021.",
      "price": 280,
      "discountPercentage": 17.91,
      "rating": 4.3,
      "stock": 123,
      "brand": "OPPO",
      "category": "smartphones",
      "thumbnail": "https://dummyjson.com/image/i/products/4/thumbnail.jpg",
      "images": [
        "https://dummyjson.com/image/i/products/4/1.jpg",
        "https://dummyjson.com/image/i/products/4/2.jpg",
        "https://dummyjson.com/image/i/products/4/3.jpg",
        "https://dummyjson.com/image/i/products/4/4.jpg",
        "https://dummyjson.com/image/i/products/4/thumbnail.jpg"
      ]
    };

    it('should set loading$ to true at the start and set to false in the end', async () => {
      const loadingSpy = jest.spyOn(service['loading$$'], 'next');
      expect(loadingSpy).not.toHaveBeenCalled();
      await lastValueFrom(service.addProduct(product));
      expect(loadingSpy).toHaveBeenNthCalledWith(1, true);
      expect(loadingSpy).toHaveBeenNthCalledWith(2, false);
    });

    it('should add product to products$', async () => {
      await expect(lastValueFrom(service.products$.pipe(first()))).resolves.toEqual([]);
      await lastValueFrom(service.addProduct(product));
      await expect(lastValueFrom(service.products$.pipe(first()))).resolves.toEqual([product]);
    });

  });

  describe('lastUpdatedSec$', () => {

    beforeEach(() => {
      httpServiceMock = productHttpServiceMock as ProductHttpService;
      service = new ProductService(httpServiceMock);
    });

    it('should return amount of seconds since last products$ update with 60s interval', fakeAsync(async () => {
      tick(1);
      await expect(lastValueFrom(service.lastUpdatedSec$.pipe(take(1)))).resolves.toEqual(0);
      flush();
    }));
  });
});