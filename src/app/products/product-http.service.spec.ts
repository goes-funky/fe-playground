import { TestBed } from '@angular/core/testing';
import { Product, ProductHttpService } from './product-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe(ProductHttpService.name, () => {
  let service: ProductHttpService;
  let testingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductHttpService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ProductHttpService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should search', () => {
    const query = 'test';
    service.search(query).subscribe();
    const req = testingController.expectOne(
      `/api/products/search?q=${query}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should create', () => {
    const product: Product = {title: 'test', description: 'test desc'} as Product;
    service.create(product).subscribe();
    const req = testingController.expectOne(
      `/api/products/add`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(product);
    req.flush(null);
  });
});
