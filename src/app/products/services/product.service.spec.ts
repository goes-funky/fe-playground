import { lastValueFrom } from 'rxjs';
import { productHttpServiceMock } from './mocks';
import { ProductService } from './product.service';
import { ProductHttpService } from './product-http.service';
import { Product } from '../models';

describe('ProductService', () => {
  const service = new ProductService(productHttpServiceMock as ProductHttpService);

  describe('getAll', () => {

    it('should set loading$ to true at the start and set to false in the end', async () => {
      const loadingSpy = jest.spyOn(service.loading$);
      expect(loadingSpy).not.toHaveBeenCalled();
      await lastValueFrom(service.getAll());
      expect(loadingSpy).toHaveBeenNthCalledWith(1, true);
      expect(loadingSpy).toHaveBeenNthCalledWith(2, false);
    });

    it('should update products$ with products from api', async () => {
      await expect(lastValueFrom(service.products$)).resolves.toEqual([]);
      await lastValueFrom(service.getAll());
      const expectedResult = await lastValueFrom(productHttpServiceMock!.getAll());
      await expect(lastValueFrom(service.products$)).resolves.toEqual(expectedResult.products);
    });
  });

  describe('addProduct', () => {
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
      const loadingSpy = jest.spyOn(service.loading$);
      expect(loadingSpy).not.toHaveBeenCalled();
      await lastValueFrom(service.addProduct(product));
      expect(loadingSpy).toHaveBeenNthCalledWith(1, true);
      expect(loadingSpy).toHaveBeenNthCalledWith(2, false);
    });

    it('should add product to products$', async () => {
      await expect(lastValueFrom(service.products$)).resolves.toEqual([]);
      await lastValueFrom(service.addProduct(product));
      await expect(lastValueFrom(service.products$)).resolves.toEqual([product]);
    });

  });
});