import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

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

export interface ProductSearchResult {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  readonly ADD_URI = '/api/products/add';
  readonly SEARCH_URI = (searchQuery: string) => `api/products/search?q=${searchQuery}`;

  constructor(private http: HttpClient) {}

  // https://dummyjson.com/docs/products

  getAll() {
    return this.http.get<ProductSearchResult>('/api/products');
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  addProduct(product: Partial<Product>) {
    return this.http.post<Product>(this.ADD_URI, product);
  }

  searchProducts(searchQuery: string) {
    return this.http.get<ProductSearchResult>(this.SEARCH_URI(searchQuery)).pipe(
      catchError(() =>
        of({
          products: [],
          total: 0,
          skip: 0,
          limit: 0,
        }),
      ),
    );
  }
}
