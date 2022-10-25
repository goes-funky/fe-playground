import { Component } from '@angular/core';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'y42-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
    `
      .full-width {
        width: 100%;
      }

      .shipping-card {
        min-width: 120px;
        margin: 20px auto;
      }

      .mat-radio-button {
        display: block;
        margin: 5px 0;
      }

      .row {
        display: flex;
        flex-direction: row;
      }

      .col {
        flex: 1;
        margin-right: 20px;
      }

      .col:last-child {
        margin-right: 0;
      }
    `,
  ],
})
export class ProductDetailComponent {
  constructor(private productService: ProductService) {}

  createProduct(product: Product) {
    this.productService.createProduct(product);
  }
}
