import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, timer } from 'rxjs';

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

export interface DummyResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {}

  // https://dummyjson.com/docs/products

  getAll() {
    return this.http.get<DummyResponse<Product>>('/api/products');
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  findProducts(search: string) {
    return this.http.get<DummyResponse<Product>>(`https://dummyjson.com/products/search?q=${search}`)
  }

  fakeAdd(newProduct: Product): Observable<Product> {
    return timer(750).pipe(map(() => newProduct));
  }

  fakeUpdate(id: number, parameterToModify: Partial<Product>): Observable<Partial<Product>> {
    return timer(750).pipe(map(() => ({id, ...parameterToModify})));
  }
}
