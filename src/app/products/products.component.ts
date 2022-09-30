import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { debounceTime, distinctUntilChanged, filter, Subject, Subscription, switchMap } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <div class="products-header">
        <h2>Products</h2>
        <button class="add-product" mat-button color="primary" type="button" (click)="openSheet()">Add Product</button>
      </div>
      <mat-form-field class="form-field" appearance="outline">
        <mat-label>Filter results</mat-label>
        <input class="filter-products" matInput type="text" [(ngModel)]="value" (input)="triggerSearch(false)">
        <button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="triggerSearch(true)">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    h2 {
      display: flex;
      margin-bottom: 0;
    }
    .products-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .form-field {
      width: 200px;
    }
  `],

})

export class ProductsComponent {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) { }
  value:string = ''
  private readonly search = new Subject<string | undefined>();
  private searchSub?: Subscription;

  triggerSearch(clear: Boolean): void {
    clear && (this.value = '')
    this.search.next(this.value);
  }

  openSheet() {
    this.bottomSheet.open<ProductDetailComponent>(ProductDetailComponent)
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => {
          console.log(newProduct)
          return this.productService.createProduct(newProduct)
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.searchSub = this.search
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          console.log(query)
          if(!query) {
            return this.productService.getAll()
          }
          return this.productService.getFiltered(query)
        })
      )
      .subscribe()
  }
}
