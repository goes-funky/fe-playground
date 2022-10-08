import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProductsQueryParams, Product, ProductsApiResponse } from '../models/product';


@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {}

  // https://dummyjson.com/docs/products

  getAll(queryParams: GetProductsQueryParams = {}) {
    const { search, ...otherQueryParams } = queryParams;

    if (search) {
      const params = new URLSearchParams({ ...otherQueryParams, q: search }).toString();
      
      return this.http.get<ProductsApiResponse>(`/api/products/search?${params}`)
    }

    const params = new URLSearchParams(queryParams as Record<string, string>).toString();

    return this.http.get<ProductsApiResponse>(`/api/products?${params}`);
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  post(product: Partial<Omit<Product, 'id'>>): Observable<Product> {
    return this.http.post<Product>('/api/products/add', product)
  }
}
