import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { of } from 'rxjs';
import { Product, ProductsApiResponse } from '../models/product';
import { ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatBottomSheetModule],
      providers: [ProductService],
    });
  }));

  it('should fetch data from server', () => {
    jest.useFakeTimers();
    expect.assertions(4);

    const fakeProduct = { id: 'fakeID', title: 'fake product ' };
    const fakeSearch = 'search';
    jest
      .spyOn(ProductHttpService.prototype, 'getAll')
      .mockImplementation((q) => of({ products: [fakeProduct as unknown as Product] } as ProductsApiResponse));
    service = TestBed.inject(ProductService);

    service.getAll();

    expect(ProductHttpService.prototype.getAll).toBeCalledWith({});

    service.getAll({ search: fakeSearch });

    expect(ProductHttpService.prototype.getAll).toBeCalledWith({ search: fakeSearch });

    service.products$.subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0]).toMatchObject(expect.objectContaining(fakeProduct));
    });

    jest.runAllTimers();
  });
});
