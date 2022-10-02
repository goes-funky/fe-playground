import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, interval, switchMap } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from './product-http.service';
import { ProductService } from './product.service';

@Component({
  selector: 'y42-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {
    this._addSubForLastTimeProductsUpdated();
  }

  // UI variables
  lastUpdatedSeconds!: number;

  // private varaibles
  private _lastTimeProductsUpdated!: number;

  // life cycle events
  ngOnInit(): void {
    this._setIntervalForLastTimeUpdatedLabel();
  }

  // private methods
  private _addSubForLastTimeProductsUpdated() {
    this.productService.lastTimeProductsUpdated$.subscribe((data) => {
      this._lastTimeProductsUpdated = data;
    });
  }

  private _setIntervalForLastTimeUpdatedLabel() {
    interval(30 * 1000).subscribe(() => {
      this.lastUpdatedSeconds = Math.round((new Date().getTime() - this._lastTimeProductsUpdated) / 1000);
    });
  }

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
