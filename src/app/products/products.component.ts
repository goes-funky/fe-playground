import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FetchTimerService } from './services/product-fetch-timer.service';
import { Product } from './services/product-http.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <h2>Products</h2>
        <input [formControl]="searchField" />
        <ng-container *ngIf="fetchTimer$ | async as passedTime">
          Seconds after last fetch {{passedTime}} sec
        </ng-container>
        <button (click)="addNewProduct()">Add new product</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent {
  public searchField = this.fb.control('');
  public fetchTimer$ = this.fetchTimer.observable$

  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet, private fb: FormBuilder, private fetchTimer: FetchTimerService) {
    this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        filter((item) => !!item),
        switchMap((value) => this.productService.searchByKey(value)),
      )
      .subscribe();
  }

  public addNewProduct(): void {
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: null })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.addNewProduct(newProduct)),
      )
      .subscribe();
  }
}
