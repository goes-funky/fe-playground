import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { debounceTime, distinctUntilChanged, filter, Subject, Subscription, switchMap, timer } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  template: `
  <div>
    <button id="addProductButton" mat-raised-button color="primary" (click)="onAddProduct()">Add Product</button>
    <input id="searchProductInput" placeholder="Search" (keyup)="searchProducts($event)" />
    <label>Last fetched: {{lastFetchedTimeInSeconds}} seconds ago</label>
  </div>
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
  openProduct = (params: RowDoubleClickedEvent<Product>) => this.#openProduct(params);
  onAddProduct = () => this.#onAddProduct();
  searchProducts = ($event: KeyboardEvent) => this.#searchProducts($event);

  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;
  lastFetchedTimeInSeconds: number = 0;

  #searchTextChange = new Subject<string>();
  #keyUpSubscription!: Subscription;
  #timerSubscription!: Subscription;

  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) { }

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
      valueFormatter: (params) => `${(parseFloat(params.value) as number).toFixed(2)}/5`,
    },
  ];

  ngOnInit(): void {
    this.productService.getAll().subscribe();
    this.#subscribeForSearchTextChange();
    this.#initialiseLastFetchedTimer();
  }

  #openProduct(params: RowDoubleClickedEvent<Product>): void {
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

  #onAddProduct(): void {
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: null })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
      )
      .subscribe();
  }

  #searchProducts(event: KeyboardEvent): void {
    if (!(<HTMLInputElement>event.target).value) {
      this.#searchTextChange.next("");
      return;
    }
    this.#searchTextChange.next((<HTMLInputElement>event.target).value);
  }

  #subscribeForSearchTextChange(): void {
    this.#keyUpSubscription = this.#searchTextChange.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe((searchText: string) => {
        this.productService.search(searchText).subscribe();
      });
  }

  #initialiseLastFetchedTimer(): void {
    this.#timerSubscription = timer(0, 60000).subscribe(() => {
      this.#updateLastFetchedTime(this.productService.lastFetchedDateTime);
    });
  }
  #updateLastFetchedTime(lastFetchedDateTime:Date): void {
    if(!lastFetchedDateTime) {
      return;
    }
    this.lastFetchedTimeInSeconds = Math.floor((Date.now() - lastFetchedDateTime.getTime()) / 1000);
  }

  ngOnDestroy(): void {
    this.#timerSubscription?.unsubscribe();
    this.#keyUpSubscription?.unsubscribe();
  }
}
