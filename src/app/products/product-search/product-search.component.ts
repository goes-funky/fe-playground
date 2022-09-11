import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-search',
  templateUrl: './product-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  readonly takeUntil$: Subject<void> = new Subject();
  searchInputFormControl = new FormControl<string>('', { validators: [Validators.required], nonNullable: true });
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.searchInputFormControl.valueChanges
      .pipe(
        takeUntil(this.takeUntil$),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchQuery: string) => this.productService.searchProducts(searchQuery)),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.takeUntil$.next();
    this.takeUntil$.complete();
  }
}
