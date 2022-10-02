import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, switchMap } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from './product-http.service';
import { ProductService } from './product.service';

@Component({
  selector: 'y42-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

  // action methods
  addProduct(){
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
