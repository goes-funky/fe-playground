import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Product, ProductHttpService } from "./product-http.service";
import { ProductService } from "./product.service";

const mockResponse = {
    skip: 0,
    total: 100,
    limit: 30,
    products:[
        {
            brand: "Apple",
            category: "smartphones",
            description: "An apple mobile which is nothing like apple",
            discountPercentage: 12.96,
            id: 1,
            images: ["https://dummyjson.com/image/i/products/1/1.jpg", "https://dummyjson.com/image/i/products/1/2.jpg"],
            price: 549,
            rating: 4.69,
            stock: 94,
            thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
            title: "iPhone 9",
        }
    ]
}

const mockProductToAdd = {
    brand: "Micro",
    category: "laps",
    description: "An apple mobile which is nothing like apple",
    discountPercentage: 12.96,
    images: ["https://dummyjson.com/image/i/products/1/1.jpg", "https://dummyjson.com/image/i/products/1/2.jpg"],
    price: 54,
    id:12,
    rating: 4.9,
    stock: 9,
    thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
    title: "Surface",
}

describe('ProductService', () => {
    let productService: ProductService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
            ProductService,
            {
                provide: ProductHttpService,
                useValue: {
                    getAll: () => of(mockResponse),
                    addProduct: (newProduct: Partial<Product>) => of({id: 12})
                }
            }
        ],
      });
      productService = TestBed.inject(ProductService);
    });
  
    it('getAll products', () => {
        productService.getAll().subscribe()
        productService.products$.subscribe(val => expect(val).toEqual(mockResponse.products))
    });

    it('add new product', () => {
        productService.addNewProduct(mockProductToAdd).subscribe()
        productService.products$.subscribe(val => expect(val).toEqual([...mockResponse.products, mockProductToAdd]))
    });

    it('update product', () => {
        productService.getAll().subscribe()
        productService.updateProduct(mockResponse.products[0].id,mockProductToAdd).subscribe()
        productService.products$.subscribe(val => expect(val).toEqual([mockProductToAdd]))
    });
  });