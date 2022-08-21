import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id: number | null;
  title: string | null;
  description: string;
  stock: number;
  price: number;
  discountPercentage: number | null;
  rating: number | null;
  brand: string | null;
  category: string | null;
  thumbnail: string | null;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {
  }

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

  filterProducts(filter: string) {
    return this.http.get<{products: Product[]}>(`https://dummyjson.com/products/search?q=${filter}`)
  }

  createProduct(product: Product) {
    return this.http.post<Product>('https://dummyjson.com/products/add', product);
  }
}
