import { fakeAsync, tick } from '@angular/core/testing';
import { of, switchMap } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let mockHttpService: Partial<ProductHttpService>;
  beforeEach(() => {
    mockHttpService = {
      addProduct: jest.fn(),
    };

    productService = new ProductService(mockHttpService as ProductHttpService);
  });

  it('should add product to the list of products', fakeAsync(() => {
    const productToAdd = {
      title: 'title',
      description: 'description',
      price: 3,
      rating: 3,
    } as Product;

    jest.spyOn(mockHttpService, 'addProduct').mockImplementation(() => of({ ...productToAdd, id: 123 }));

    productService
      .addProduct(productToAdd)
      .pipe(switchMap(() => productService.products$))
      .subscribe((products: Product[]) => {
        expect(products).toEqual([{ ...productToAdd, id: 123 }]);
      });

    tick(800);
  }));
});
