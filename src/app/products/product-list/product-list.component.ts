import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { debounceTime, delay, distinctUntilChanged, filter, interval, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { FormControl } from '@angular/forms';
import { Product } from '../product-services/product-http.service';
import { ProductService } from '../product-services/product.service';

@Component({
  selector: 'y42-product-list',
  template: `
    <!-- Product-list-header-->
    <h5>Last updated: {{ (timeSinceLastCall | async) | dateTimeFormat: 'mm:ss' }}</h5>
    <y42-product-header (addProductEvent)="onAddProduct()" [searchControl]="searchCtrl"> </y42-product-header>

    <!-- Product-list-body-->
    <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="products$ | async"
      [gridOptions]="gridOptions"
      [columnDefs]="columnDefs"
      (rowDoubleClicked)="openProduct($event)"
    >
    </ag-grid-angular>

    <!-- Loading spinner-->
    <ng-container *ngIf="loading$ | async">
      <mat-spinner [diameter]="36" [mode]="'indeterminate'"></mat-spinner>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
        position: relative;
      }

      ag-grid-angular {
        display: block;
        width: 100%;
        height: 100%;
      }

      mat-spinner {
        position: absolute;
        z-index: 999;
        height: 2em;
        width: 2em;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `,
  ],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;
  readonly gridOptions: GridOptions<Product> = {
    suppressCellFocus: true,
    animateRows: true,
    stopEditingWhenCellsLoseFocus: true,
    defaultColDef: {
      minWidth: 150,
      sortable: true,
      resizable: true,
    },
  };
  readonly columnDefs: Array<ColDef<Product>> = [
    {
      headerName: 'Title',
      field: 'title',
      sort: 'asc',
    },
    {
      headerName: 'Brand',
      field: 'brand',
    },
    {
      headerName: 'Description',
      field: 'description',
    },
    {
      headerName: 'Stock',
      field: 'stock',
      valueFormatter: (params) => Intl.NumberFormat(undefined).format(params.value),
      editable: true,
      onCellValueChanged: (params) => {
        const data: Product = params.data;
        const newStock: string = params.newValue;
        this.productService.updateStock(data.id, Number(newStock)).subscribe();
      },
      cellStyle: {
        'border-left': '1px dashed #ddd',
        'border-bottom': '1px dashed #ddd',
      },
    },
    {
      headerName: 'Price',
      field: 'price',
      editable: true,
      valueFormatter: (params) =>
        Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(params.value),
      onCellValueChanged: (params) => {
        const data: Product = params.data;
        const newPrice: string = params.newValue;
        this.productService.updatePrice(data.id, Number(newPrice)).subscribe();
      },
      cellStyle: {
        'border-left': '1px dashed #ddd',
        'border-bottom': '1px dashed #ddd',
      },
    },
    {
      headerName: 'Rating',
      field: 'rating',
      valueFormatter: (params) => `${(params.value as number).toFixed(2)}/5`,
    },
  ];
  readonly searchCtrl = new FormControl();
  readonly timeSinceLastCall = this.productService.timer$;
  private unsubscription$ = new Subject<void>();

  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchProducts();
  }

  ngAfterViewInit(): void {
    interval(60000 * 2)
      .pipe(
        delay(5000),
        takeUntil(this.unsubscription$),
        tap(() => this.getAllProducts()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }

  /* Feature to Add product using the exisit product details component */
  onAddProduct() {
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent)
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
        take(1),
      )
      .subscribe();
  }

  openProduct(params: RowDoubleClickedEvent<Product>): void {
    if (!params.data) {
      return;
    }

    const target = params.event?.target as HTMLElement;
    if (target.classList.contains('ag-cell-inline-editing')) {
      return;
    }

    const product: Product = params.data;
    const id = product.id;
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: product })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.updateProduct(id, newProduct)),
      )
      .subscribe();
  }

  /* Search functionality to filter the product list using the API */
  private searchProducts() {
    this.searchCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        takeUntil(this.unsubscription$),
        switchMap((entry: string) => {
          // Listen to value changes on the search input field
          return this.productService.searchProducts(entry);
        }),
      )
      .subscribe();
  }

  private getAllProducts() {
    this.productService.getAll().pipe(take(1)).subscribe();
  }
}
