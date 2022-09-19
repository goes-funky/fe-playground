import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { catchError, filter, switchMap, take, of, Observable } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from './products.component.model';
import { ProductFetchTimerService } from './services/product-fetch-timer.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'y42-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  timer$: Observable<number>;
  
  constructor(
    private productService: ProductService,
    private bottomSheet: MatBottomSheet,
    private ProductFetchTimerService: ProductFetchTimerService,
  ) {
    this.timer$ = this.ProductFetchTimerService.timer$;
  }

  addProduct() {
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent)
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct: Product) =>
          this.productService.addProduct(newProduct).pipe(
            catchError((errMessage: string) => {
              console.info(`Error Message - ${errMessage}`);
              return of(undefined);
            }),
          ),
        ),
        take(1)
      )
      .subscribe();
  }
}
