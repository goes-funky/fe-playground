import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, of } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'y42-product-search',
  templateUrl: './product-search.component.html'
})
export class ProductSearchComponent implements AfterViewInit {
  productSearchFormControl = new FormControl<string>('', { nonNullable: true });

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.productSearchFormControl.valueChanges
      .pipe(
        debounceTime(500),
        map((value) =>  value.trim()),
        distinctUntilChanged(),
        switchMap((searchText: string) => this.productService.searchProduct(searchText)
        .pipe(
          catchError((errMessage: string) => {
            console.info(`Error Message while searcing the product - ${errMessage}`);
            return of(undefined);
          }),
        )),
      )
      .subscribe();
  }
}
