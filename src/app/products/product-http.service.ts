import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  title: string|undefined;
  description: string|undefined;
  price: number|undefined;
  discountPercentage: number;
  rating: number;
  stock: number|undefined;
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

  add(product:Product){
    return this.http.post<Product>("api/products/add",JSON.stringify(product),{headers:{'Content-Type': 'application/json'} })
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }
  search(title:string){
    return    this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(`/api/products/search?q=${title}`,{headers:{'Content-Type': 'application/json'}});
  }
}
