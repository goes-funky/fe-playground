import { Component } from '@angular/core';
import { ProductService } from "./product.service";

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <div style="display: flex; align-items: center">
        <h2>Products</h2>
        <p style="color: gray; margin-left: 12px">Fetched {{seconds$ | async}} <span
          *ngIf="seconds$.value !== 'just now'">seconds ago</span></p>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})

export class ProductsComponent {

  constructor(private productService: ProductService) {}
  seconds$ = this.productService.seconds$$
}
