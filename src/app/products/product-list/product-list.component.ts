import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { filter, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductEditFacade } from '../product-edit.facade';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  template: `<ag-grid-angular
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
  constructor(private productService: ProductService, private productEditFacade: ProductEditFacade) {}

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
    this.productService.getAll()
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

    this.productEditFacade
      .editProduct({
        ...product,
        id,
      })
      .subscribe();
  }
}
