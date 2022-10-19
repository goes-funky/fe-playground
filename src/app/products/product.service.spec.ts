import { IGETProductResponse, Product, ProductHttpService } from './product-http.service';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { scheduled, asyncScheduler } from 'rxjs';

describe(ProductService.name, () => {
  let service: ProductService;
  let productHttpServiceStub: ProductHttpService;

  beforeEach(async () => {
    productHttpServiceStub = {
      getAll: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
    } as unknown as ProductHttpService;
    await TestBed.configureTestingModule({
      providers: [ProductService, { provide: ProductHttpService, useValue: productHttpServiceStub }],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should searchByQuery', () => {
    const query = 'test search';
    const res: IGETProductResponse = { limit: 0, products: [{ title: 'test' } as Product], skip: 0, total: 1 };
    productHttpServiceStub.search = jest.fn().mockReturnValue(scheduled([res], asyncScheduler));
    service[`_updateProducts`] = jest.fn();
    service.searchByQuery(query).subscribe({
      next: () => {
        expect(productHttpServiceStub.search).lastCalledWith(query);
        expect(service[`_updateProducts`]).lastCalledWith(res.products);
        expect(service['loading$$'].getValue).toBeFalsy();
      },
    });
  });

  it('should addProduct', () => {
    const req: Product = { title: 'test', description: 'desc' } as Product;
    const res: Product = { ...req, id: 5 } as Product;
    productHttpServiceStub.create = jest.fn().mockReturnValue(scheduled([res], asyncScheduler));
    service[`_updateProductById`] = jest.fn();
    service.addProduct(req).subscribe({
      next: () => {
        expect(productHttpServiceStub.create).lastCalledWith(req);
        expect(service[`_updateProductById`]).lastCalledWith(res);
        expect(service['loading$$'].getValue).toBeFalsy();
      },
    });
  });
});
