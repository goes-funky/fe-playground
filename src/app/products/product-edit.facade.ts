import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from '../models/product';

@Injectable({ providedIn: 'any' })
export class ProductEditFacade {
  constructor(private readonly productService: ProductService, private readonly bottomSheet: MatBottomSheet) {}

  public editProduct(product: Product): Observable<Product> {
    return this.openProductDetailModal(product).pipe(
      switchMap((newProduct) => this.productService.updateProduct(product.id, newProduct).pipe(map(() => newProduct))),
    );
  }

  public createProduct(): Observable<Product> {
    return this.openProductDetailModal().pipe(switchMap((newProduct) => this.productService.addProduct(newProduct)));
  }

  private openProductDetailModal(product?: Product): Observable<Product> {
    return this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: product })
      .afterDismissed()
      .pipe(filter(Boolean));
  }
}
