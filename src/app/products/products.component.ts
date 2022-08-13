import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { filter, switchMap } from 'rxjs';
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

  addProduct() {
    const emptyProduct: Product = {
      id: new Date().getTime(),
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
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
      )
      .subscribe();
  }
}
