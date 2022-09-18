import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { FetchTimerService } from './product-fetch-timer.service';

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
  isEditable?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient,private fetchTimer: FetchTimerService) {}

  // https://dummyjson.com/docs/products

  getAll() {
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>('/api/products').pipe(tap(() => this.fetchTimer.reset()));
  }

  addProduct(newProduct: Partial<Product>) {
    return this.http.post('/api/products/add', { body: newProduct }).pipe(tap(() => this.fetchTimer.reset()));
  }

  searchByKey(key: string | null) {
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(`api/products/search?q=${key}`).pipe(tap(() => this.fetchTimer.reset()));
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`).pipe(tap(() => this.fetchTimer.reset()));
  }
}
