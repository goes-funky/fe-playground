import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


  addProduct(product: Product){
    return this.http.post<Product>(`/api/products/add`, {product});
  }

  searchProducts(q:any){
    return this.http.get<any>(`/api/products${q ? '/search?q='+ q : ''}`);
  }
}
