import { Component, NgZone, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { filter, switchMap, firstValueFrom } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  template: `
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
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet, private readonly ngZone: NgZone) {
  }

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
      onCellValueChanged: async (params): Promise<void> => {
        const data: Product = params.data;
        const newStock: string = params.newValue;
        await firstValueFrom(this.productService.updateStock(data.id, Number(newStock)));
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
      onCellValueChanged: async (params): Promise<void> => {
        const data: Product = params.data;
        const newPrice: string = params.newValue;
        await firstValueFrom(this.productService.updatePrice(data.id, Number(newPrice)));
      },
      cellStyle: {
        'border-left': '1px dashed #ddd',
        'border-bottom': '1px dashed #ddd',
      },
    },
    {
      headerName: 'Rating',
      field: 'rating',
      valueFormatter: (params) => Number.isFinite(params.value) ? `${(params.value as number).toFixed(2)}/5` : 'no rating yet',
    },
  ];

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => setInterval(async () => await firstValueFrom(this.productService.getAll()), 60000));
  }

  async openProduct(params: RowDoubleClickedEvent<Product>): Promise<void> {
    if (!params.data) {
      return;
    }

    const target = params.event?.target as HTMLElement;
    if (target.classList.contains('ag-cell-inline-editing')) {
      return;
    }

    const product: Product = params.data;
    const id = product.id;
    await firstValueFrom(this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: product })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.updateProduct(id, newProduct)),
      ));
  }
}
