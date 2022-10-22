import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import {debounceTime, filter, Subject, switchMap, takeUntil} from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../../../common/services/product.service';
import { Product } from "../../../../common/interfaces/product.interface";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'y42-product-list',
  template: `
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input type="text" matInput placeholder="Seach by phone's name" [formControl]="searchInput"/>
        </mat-form-field>
      </div>
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

  readonly searchInput = new FormControl( '', { validators: [Validators.min(0)], nonNullable: true })

  public ngDestroyed$ = new Subject();

  ngOnInit(): void {
    this.productService.getAll().subscribe();
    this.searchByPhoneName();
  }

  searchByPhoneName():void{
      this.searchInput.valueChanges.pipe(
          takeUntil(this.ngDestroyed$),
          debounceTime(1000),
          switchMap(()=>        this.productService.searchByPhone(this.searchInput.value))
      ).subscribe(() => {});
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
  ngOnDestroy(): void {
    this.ngDestroyed$.next(true);
  }
}
