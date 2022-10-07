import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {}

  // https://dummyjson.com/docs/products

  searchString = new BehaviorSubject<string>("");

  getAll() {
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>('/api/products');
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }


  addProduct(product: Product) {
    const url = 'https://dummyjson.com/products/add';
    return this.http.post<{
      productDetails: Product;
    }>(url, product);

   
  }

  searchProduct(query: string) : Observable<any>  {
      return this.http.get<Product>(`https://dummyjson.com/products/search?q=${query}`);
  }

}
