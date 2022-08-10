import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type ProductId = number;

export interface Product {
  id: ProductId;
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

export interface ResponceMeta {
  products: Product[];
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

  search(text: string) {
    return this.http.get<ResponceMeta>(`/api/products/search?q=${text.trim()}`);
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }
}
