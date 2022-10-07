import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, switchMap } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from './product-http.service';
import { ProductService } from './product.service';
@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <div class="d-flex justify-content-between">
        <h2>Products</h2>
        <button mat-button color="primary" type="button" (click)="openAddNew()">+ Add New</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host{
        .d-flex{
          display: flex;
        }
        .justify-content-between{
          justify-content: space-between;
          align-items: center;
        }
      }
    `
  ]
})
export class ProductsComponent {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

  openAddNew(): void {
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent)
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
      )
      .subscribe();
      
  }
}
