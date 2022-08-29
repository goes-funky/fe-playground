import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { filter, interval, switchMap, tap } from 'rxjs';

import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  searchKey = new FormControl('');
  seconds = 0;
  fetchTime = 0;
  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;

   /**
   * Product table options
   */
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
  /**
   * Product table columns
   */
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
  
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}


  ngOnInit(): void {
    this.productService.getAll().subscribe(() => this._resetToCurrentTime());
    this.searchKey.valueChanges
      .pipe(
        filter(Boolean),
        switchMap((searchWord) => this.productService.searchProduct(searchWord)),
        tap(() => this._resetToCurrentTime()),
      )
      .subscribe();
    interval(1000)
      .pipe(tap(() => (this.seconds = this._getCurrentTimeSeconds())))
      .subscribe();
  }

  /**
   * its reset search param value and refetch product list
   */
   clearFilter() {
    this.searchKey.reset();
    this.productService.getAll().subscribe();
  }

  /**
   * call when user select a product whit double click on product row
   * open a dialog and patch selected row data to form value for edit product
   * After submitting the form, the dialog will be closed and the product will be updated
   * @param rowEvent grid row data
   */
   editProduct(rowEvent: RowDoubleClickedEvent<Product>): void {
    if (!rowEvent.data) {
      return;
    }

    const target = rowEvent.event?.target as HTMLElement;
    if (target.classList.contains('ag-cell-inline-editing')) {
      return;
    }

    const product: Product = rowEvent.data;
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

  /**
   * this method fire when user click on "Add New Product" button
   * first time open a material bottomSheet and new product form
   * when user submitted that form afterDismissed method called and return form value
   * in the last we save form value such as new product in product list
   */
   addProduct(): void {
    this.bottomSheet
      .open<ProductDetailComponent, Partial<Product>, Product>(ProductDetailComponent, { data: {} })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
      )
      .subscribe();
  }

  /**
   * this method reset time
   * @returns return current time second
   */
   private _getCurrentTimeSeconds(): number {
    return Math.round(new Date().getTime() - this.fetchTime) / 1000;
  }

  /**
   * this method rest to current time
   * set current time to seconds value
   */
  private _resetToCurrentTime(): void {
    this.fetchTime = new Date().getTime();
    this.seconds = 0;
  }
}
