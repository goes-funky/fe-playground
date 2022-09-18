import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { Product, ProductSearchResult } from '../products.component.model';
import { ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';

describe('Product service', () => {
  const mockProduct: Product = {
    title: 'Samsung S42',
    description: 'This is samsung s42 new lanuch',
    price: 420,
    stock: 20,
  } as Product;

  const mockProductHttpService = MockService(ProductHttpService);
  mockProductHttpService.add = jest.fn(() => of({...mockProduct, id: 'test' } as unknown as Product));
  mockProductHttpService.search = jest.fn(() => of({products: [], limit: 10, skip: 0, total: 0} as ProductSearchResult));

  const service = new ProductService(mockProductHttpService);

  it('should add product', () => {
    service.addProduct(mockProduct).subscribe((response) => {
      expect(response).toBe({
        ...mockProduct,
        id: 'test'
      })
    });
  });

  it('should search product', () => {
    service.searchProduct('test').subscribe((response) => {
      expect(response.products).toHaveLength(0);
    })
  })
});
