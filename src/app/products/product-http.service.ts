import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';

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

export interface IProductResponse {
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

  getAll() {
    return this.http.get<IProductResponse>(Constants.API_GET_ALL_PRODUCTS);
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  /**
   *
   * @param product : Product
   * @returns Added Product with generated id
   */
  add(product: Partial<Product>) {
    return this.http.post<Product>(Constants.API_ADD_PRODUCT, product);
  }

  /**
   *
   * @param query
   * @returns Filtered results based on search query string
   * @returnType IProductResponse (subset of all products)
   */
  filter(query: string) {
    return this.http.get<IProductResponse>(`api/products/search?q=${query}`);
  }
}
