import { Component } from '@angular/core';
import {ProductService} from "./product.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Unsibscriber} from "../unsubscriber";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable, repeat,
  switchMap,
  takeUntil,
  takeWhile,
  tap
} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem;">
      
      <div style="display: flex;align-items: center; justify-content: space-between">
        <h2 style="display: block; margin: auto 0">Products</h2>
        <button mat-button (click)="addProduct()">Add a product</button>

        <label>Fetched {{ sequence$ | async }} seconds ago</label>

        <mat-form-field class="example-full-width" appearance="fill">
          <mat-label>Favorite food</mat-label>
          <input matInput placeholder="Search gloceries" id="search" [formControl] = 'search'>
        </mat-form-field>
        
      </div>
      
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent extends Unsibscriber {

  search: FormControl = new FormControl();
  sequence$: Observable<number> = new Observable<number>();

  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {
    super();
  }

  ngOnInit() {
    this.search.valueChanges
        .pipe(
            debounceTime(300),
            map((text) => text.trim()),
            filter((text) => text.length > 3 || (this.search.value === '' && this.search.touched)),
            distinctUntilChanged(),
            tap(() => {
              this.search.markAsTouched()
            }),
            switchMap((str) => {
              return this.productService.filterProducts(str)
            })
        )
        .subscribe();

    this.sequence$ = interval(1000)
        .pipe(
            takeWhile(num => num < 60),
            repeat(),
        );
  }



  addProduct() {
    const newProduct = {};
    this.productService.addProduct(newProduct)
        .pipe(takeUntil(this.unSubscriber$$)).subscribe()
  }
}
