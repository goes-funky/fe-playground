import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { filter, interval, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

const SECOND = 1000;
const MINUTE = SECOND * 60;

@Component({
  selector: 'y42-product-list',
  template: `
  <div class="button-wrapper">
    <button mat-button (click)="newProduct($event)" style="margin-bottom: 1rem">Add product</button>
  </div>
  <span class="label">Fetched {{updatedTime}} seconds ago</span>
  <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="products$ | async"
      [gridOptions]="gridOptions"
      [columnDefs]="columnDefs"
      (rowDoubleClicked)="openProduct($event)"
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
      
      .button-wrapper {
        display: flex;
      }
      
      .button-wrapper > button {
        margin-left: auto;
      }
      
      .label {
        display: inline-block;
        padding-bottom: .5rem;
      }
    `,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

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
      filter: 'title',
      sort: 'asc',
    },
    {
      headerName: 'Brand',
      field: 'brand',
      filter: 'brand',
    },
    {
      headerName: 'Description',
      field: 'description',
      filter: 'description',
    },
    {
      headerName: 'Stock',
      field: 'stock',
      filter: 'stock',
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
      filter: 'price',
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
      filter: 'rating',
      valueFormatter: (params) => `${(params.value as number).toFixed(2)}/5`,
    },
  ];

  updatedTime = 0;

  destroy$ = new Subject();

  ngOnInit(): void {
    this.productService.getAll().pipe(takeUntil(this.destroy$)).subscribe();

    interval(SECOND)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updatedTime++);

    interval(MINUTE)
      .pipe(switchMap(() => this.productService.getAll()), takeUntil(this.destroy$))
      .subscribe(() => this.updatedTime = 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  newProduct(event: MouseEvent): void {
    event.stopPropagation();

    this.bottomSheet
        .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, {})
        .afterDismissed()
        .pipe(
            filter(Boolean),
            switchMap((newProduct) => this.productService.createProduct(newProduct)),
        )
        .subscribe(() => this.updatedTime = 0);
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
      .subscribe(() => this.updatedTime = 0);
  }
}
