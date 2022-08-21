import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  templateUrl: './product-list.component.html',
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

      .row {
        display: flex;
        flex-direction: row;
      }

      .col {
        flex: 1;
        margin-right: 20px;
      }

      .col-end {
        justify-content: end;
        display: flex;
      }
    `,
  ],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) { }

  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;
  readonly timeElapsed$ = this.productService.interval$;

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
      valueFormatter: (params) => `${(Number(params.value) as number).toFixed(2)}/5`,
    },
  ];
  searchKey: FormControl = new FormControl();

  ngOnInit(): void {
    this.productService.getAll().subscribe();
    this.searchKey.valueChanges.pipe(
      filter(Boolean),
      debounceTime(800),
      distinctUntilChanged())
      .subscribe((val: string) => this.searchProduct(val));
  }

  searchProduct(val: string): void {
    this.productService.searchAll(val).subscribe();
  }

  reset() {
    this.searchKey.reset();
    this.productService.getAll().subscribe();
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

  addProduct() {
    let product: Product = {
      id: 0,
      title: '',
      description: '',
      price: undefined,
      discountPercentage: undefined,
      rating: undefined,
      stock: undefined,
      brand: '',
      category: '',
      thumbnail: '',
      images: []
    };
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: product })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.newProduct(newProduct)),
      )
      .subscribe();
  }
}
