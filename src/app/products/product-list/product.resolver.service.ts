import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IGETProductResponse } from '../product-http.service';

@Injectable()
export class ProductResolverService implements Resolve<Observable<IGETProductResponse>> {

  constructor(private readonly service: ProductService) { }

  resolve(): Observable<IGETProductResponse> {
    return this.service.getAll();
  }
}
