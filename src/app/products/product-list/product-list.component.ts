import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { debounceTime, filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  template: `
  <mat-form-field class="search" appearance="fill">
    <input matInput placeholder="Search..." (input)="search($event)">
  </mat-form-field>
  <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="products$ | async"
      [gridOptions]="gridOptions"
      [columnDefs]="columnDefs"
      (rowDoubleClicked)="openDetail($event)"
    ></ag-grid-angular>
    <mat-spinner *ngIf="loading$ | async" [diameter]="36" [mode]="'indeterminate'"></mat-spinner> `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
        position: relative;
      }

      .search {
        width: 100%;
      }

      ag-grid-angular {
        display: block;
        width: 100%;
        height: 100%;
      }

      mat-spinner {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
      }
    `,
  ],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;
  readonly destroy$ = new Subject();
  readonly search$ = new BehaviorSubject<string>('');

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
      onCellValueChanged: ({ data, newValue }) => {
        this.productService.update(data.id, { stock: +newValue }).pipe(take(1), takeUntil(this.destroy$)).subscribe();
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
      onCellValueChanged: ({ data, newValue }) => {
        this.productService.update(data.id, { price: +newValue }).pipe(take(1), takeUntil(this.destroy$)).subscribe();
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

  ngOnInit(): void {
    this.search$.pipe(debounceTime(500), switchMap(v => this.productService.search(v)), takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  search({ target }: Event): void {
    const value = (target as HTMLInputElement).value;
    if(value) {
      this.search$.next(value)
    }
  }

  openDetail({ data, event }: RowDoubleClickedEvent<Product>): void {
    if (data && !(event?.target as HTMLElement).classList.contains('ag-cell-inline-editing')) {
      this.bottomSheet
        .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data })
        .afterDismissed()
        .pipe(
          filter(Boolean),
          switchMap((newProduct) => this.productService.update(data.id, newProduct)),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }
}
