import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductSearchResult } from '../products.component.model';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {}

  // https://dummyjson.com/docs/products

  getAll() {
    return this.http.get<ProductSearchResult>('/api/products');
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  add(product: Product) {
    return this.http.post<Product>('/api/products/add', product);
  }

  search(queryParam: string) {
    return this.http.get<ProductSearchResult>(`/api/products/search?q=${queryParam}`)
  }
}
