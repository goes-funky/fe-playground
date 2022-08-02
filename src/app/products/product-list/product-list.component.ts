import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { BehaviorSubject, debounce, debounceTime, filter, map, Observable, of, startWith, Subscription, switchMap, tap, timer } from 'rxjs';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Unsubscribe()
@Component({
  selector: 'y42-product-list',
  template: `<button id="t-addProduct" (click)="addProduct()">Add Product</button><input id="t-search" type="text" [(ngModel)]="searchString" (ngModelChange)="searchChanged($event)">
  <y42-timer></y42-timer>
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
    `,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

  searchString: string = '';
  private readonly search$$ = new BehaviorSubject(this.searchString);
  private searchSubscription: Subscription = this.search$$.pipe(
    debounceTime(350),
    tap(res => this.processSearchQuery(res))
  ).subscribe();

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

  ngOnInit(): void {
    this.productService.getAll().subscribe();
  }

  ngOnDestroy(): void { }

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
        switchMap((editedProduct) => this.productService.updateProduct(id, editedProduct)),
      )
      .subscribe();
  }

  addProduct() {
    this.bottomSheet
      .open<ProductDetailComponent>(ProductDetailComponent)
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => {
          console.log('add product', newProduct)
          return this.productService.addProduct(newProduct)
        })
      )
      .subscribe();
  }

  searchChanged(typing: string) {
    this.search$$.next(typing);
  }

  processSearchQuery(query: string) {
    this.productService.searchProducts(query).subscribe();
  }
}
