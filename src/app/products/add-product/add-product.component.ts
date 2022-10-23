import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, switchMap } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-add-product',
  template: `
  <button mat-raised-button color="primary" (click)="addProduct()">Add Product</button>
  `,
  styles: [
    `
    :host {
      margin: 10px;
      position: absolute;
      left: 120px;
      top: 65px;
    }`
  ]
})
export class AddProductComponent {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

  addProduct() {
    this.bottomSheet
    .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: {} as Product })
    .afterDismissed()
    .pipe(
      filter(Boolean),
      switchMap((newProduct) => this.productService.addProduct(newProduct)),
    )
    .subscribe();
  }
}
