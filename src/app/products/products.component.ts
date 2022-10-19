import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from './product-http.service';
import { debounceTime, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ProductService } from './product.service';
import { FormControl } from '@angular/forms';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'y42-products',
  template: `
      <div style="height: 100%; padding: 1rem">
          <header style="display: flex; align-items: center">
              <h2 style="margin-right: 15px">Products</h2>
              <button style="height: 40px" mat-raised-button color="primary" (click)="addProduct()">Add product</button>
              <mat-form-field style="margin-left: auto; justify-self: flex-end" class="full-width">
                  <input matInput placeholder="search" type="text" autocomplete="off" [formControl]="searchControl"/>
              </mat-form-field>
              <p style="margin-left: 20px">
                  Updated {{lastUpdated$ | async}} sec ago
              </p>
          </header>
          <router-outlet></router-outlet>
      </div>
  `,
})
export class ProductsComponent implements OnInit {
  searchControl: FormControl<string | null> = new FormControl<string>('');
  lastUpdated$: Observable<number> = new Observable<number>();

  constructor(private readonly bottomSheet: MatBottomSheet, private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.initLastUpdate();
    this.initOnSearchListener();
  }

  async addProduct(): Promise<void> {
    await this.bottomSheet.open<ProductDetailComponent, void, Product>(ProductDetailComponent).afterDismissed().pipe(
      take(1),
      filter(Boolean),
      switchMap((newProduct) => this.productService.addProduct(newProduct)),
    ).subscribe({});
  }

  private initLastUpdate(): void {
    this.lastUpdated$ = interval(1000).pipe(
      switchMap(() => this.productService.updated$),
      filter(Boolean),
      map((value: number) => Math.floor((Date.now() - value) / 1000))
    );
  }

  private initOnSearchListener(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      tap((query: string | null) => this.productService.searchByQuery(query as string)),
    ).subscribe({});
  }
}
