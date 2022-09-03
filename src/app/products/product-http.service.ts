import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

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

export interface SearchProductDTO {
  products:  Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddProductDTO {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  private namespace = 'api/products';
  constructor(private http: HttpClient) {}

  // https://dummyjson.com/docs/products

  getAll() {
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(this.namespace);
  }

  get(id: string) {
    return this.http.get<Product>(`${this.namespace}/${id}`);
  }

  search(value: string) {
    return this.http.get<SearchProductDTO>(`${this.namespace}/search`, {params: {q: value}})
  }

  add(value: Omit<Product, 'id'>): Observable<AddProductDTO> {
    return this.http.post<AddProductDTO>(`${this.namespace}/add`, JSON.stringify(value));
  }
}
