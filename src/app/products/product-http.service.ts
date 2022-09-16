import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {
  }

  // https://dummyjson.com/docs/products

  getAll() {
    return this.http.get<ProductsResponse>('/api/products');
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  add(data: Partial<Product>) {
    return this.http.post<Product>('/api/products/add', data);
  }

  search(query: string) {
    return this.http.get<ProductsResponse>(`/api/products/search`, {
      params: {
        q: query,
      },
    });

  }
}
