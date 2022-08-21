import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product, ProductHttpService } from '../product-http-service/product-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ProductService', () => {
  let service: ProductService;
  const product: Product = {
    id: null,
    title: 'Sony WH',
    description: 'Sony Headphones',
    stock: 55,
    price: 300,
    discountPercentage: null,
    brand: null,
    rating: null,
    category: null,
    thumbnail: null,
    images: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductHttpService],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new product', () => {
    let productFromResponse: Product | undefined;
    service.products$$.subscribe((products) => {
      productFromResponse = products[0];
    });
    service.addNewProduct(product);
    expect(productFromResponse?.title).toEqual('Sony WH');
    expect(productFromResponse?.description).toEqual('Sony Headphones');
    expect(productFromResponse?.stock).toEqual(55);
    expect(productFromResponse?.price).toEqual(300);
  });

  it('should set product array', () => {
    const productArray = [product, product];
    let productArrayFormResponse: Product[] = [];
    service.products$$.subscribe((products) => {
      productArrayFormResponse = products;
    });
    service.setProductArray(productArray);
    expect(productArrayFormResponse.length).toEqual(productArray.length);
  });
});
