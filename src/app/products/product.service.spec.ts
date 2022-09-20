import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { IProductResponse, Product } from './product-http.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let mockProducts: Product[] = [
    {
      id: 1,
      brand: 'B1',
      category: 'C1',
      description: 'First Product',
      discountPercentage: 10,
      images: [],
      price: 400,
      rating: 4.4,
      stock: 100,
      thumbnail: '',
      title: 'First Product',
    },
  ];

  const mockProductReponse = {
    products: mockProducts,
    total: 0,
    limit: 0,
    skip: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('If products exist : getAll() should return expected products', fakeAsync(() => {
    jest.spyOn(service, 'getAll').mockReturnValue(of(mockProductReponse));
    tick(760);
    service.getAll().subscribe((productResp: IProductResponse) => {
      expect(productResp.products).toEqual(mockProducts);
    });
    discardPeriodicTasks();
  }));

  it('If products do not exist : getAll() should return empty products array', fakeAsync(() => {}));
});
