import { TestBed } from '@angular/core/testing';
import { Product, ProductHttpService } from './product-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { expect } from '@playwright/test';


describe('ProductHttpService', () => {
  let service: ProductHttpService;
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
    service = TestBed.inject(ProductHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make request to add new product', () => {
    service.createProduct(product).subscribe((product) => {
      expect(product.title).toEqual('Sony WH');
      expect(product.description).toEqual('Sony Headphones');
      expect(product.stock).toEqual(55);
      expect(product.price).toEqual(300);
    });

  });

  it('should filter products by given text', () => {
    const filterText = 'iPhone';
    service.filterProducts(filterText).subscribe((products: {products: Product[]}) => {
      let incorrectFiltering = false;
      for (let product of products.products) {
        if (!product.title!.includes(filterText) && !product.description!.includes(filterText) && !product.brand!.includes(filterText)) {
          incorrectFiltering = true;
          break;
        }
      }
      expect(incorrectFiltering).toBeFalsy();
    });
  });

});
