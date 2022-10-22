import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product} from "../interfaces/product.interface";

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

  searchByPhone(phone:string){
    const params = new HttpParams({
      fromObject:{
        q:phone,
      }
    })
    if(phone){
      return this.http.get<{
        products: Product[];
      }>('https://dummyjson.com/products/search', {params})
    }
    return this.getAll()
  }

  get(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }
}
