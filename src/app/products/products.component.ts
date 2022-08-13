import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { filter, first, switchMap } from 'rxjs';
import { ProductService } from './services';
import { Product } from './models';

@Component({
  selector: 'y42-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private productService: ProductService,
  ) {}

  lastUpdatedSec$ = this.productService.lastUpdatedSec$;

  addProduct() {
    const emptyProduct: Product = {
      id: 1,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: [],
    };
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: emptyProduct })
      .afterDismissed()
      .pipe(
        first(),
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
      )
      .subscribe();
  }
}
