import { HttpClient, HttpClientModule } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { Product } from "./product-http.service"
import { ProductService } from "./product.service"
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

describe('Add product',()=>{
  let productService:ProductService
  let http:HttpClient
  let httpController:HttpTestingController
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ProductService]
    })
    productService=TestBed.inject(ProductService)
    http=TestBed.inject(HttpClient)
    httpController=TestBed.inject(HttpTestingController)
  })
   it('Add product API',()=>{
    const testData:Boolean=true;
    const testInputData:Product={
      title: "test",
      description: "test description",
      price: 100,
      rating: 5,
      stock: 10,
      brand: "test",
      id: 0,
      discountPercentage: 0,
      category: "",
      thumbnail: "",
      images: []
    }
    productService.addProduct(testInputData).subscribe((data)=>expect(data).toEqual(testData))
  })
})

describe('Search product',()=>{
  let productService:ProductService
  let http:HttpClient
  let httpController:HttpTestingController
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ProductService]
    })
    productService=TestBed.inject(ProductService)
    http=TestBed.inject(HttpClient)
    httpController=TestBed.inject(HttpTestingController)
  })
   it('Searches the product',()=>{
    const testInputData:string='iphone'
    productService.searchProducts(testInputData).subscribe((data)=>expect(data).toReturn())
  })
})