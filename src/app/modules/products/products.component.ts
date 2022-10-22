import { Component } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ProductService} from "../../common/services/product.service";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {Product} from "../../common/interfaces/product.interface";
import { filter, first, switchMap } from 'rxjs';

@Component({
  selector: 'y42-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})
export class ProductsComponent {
  constructor(
      private bottomSheet: MatBottomSheet,
      private productService: ProductService,
  ) {
  }
  lastFetchedMoment$ = this.productService.lastFetchedMoment$$


  addNewProduct():void{
    const initialProductData = {} as Product;
    this.bottomSheet
        .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: initialProductData })
        .afterDismissed()
        .pipe(
            first(),
            filter(Boolean),
            switchMap((newProduct) => this.productService.addProduct(newProduct)),
        )
        .subscribe();

  }
}
