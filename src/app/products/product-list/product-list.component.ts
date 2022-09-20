import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { intervalService } from '../../shared/interval.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  searchText!: string;
  constructor(
    private productService: ProductService,
    private bottomSheet: MatBottomSheet,
    private intervalService: intervalService,
  ) {}

  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;
  readonly updateTime$ = this.intervalService.updateTime$;

  readonly subscription$ = new Subject();

  readonly gridOptions: GridOptions<Product> = {
    suppressCellFocus: true,
    animateRows: true,
    stopEditingWhenCellsLoseFocus: true,
    defaultColDef: {
      minWidth: 150,
      sortable: true,
      resizable: true,
    },
    pagination: true,
    paginationAutoPageSize: true,
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
      valueFormatter: (params) => {
        return params.value ? `${params.value}` : `Unknown`;
      },
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
      valueFormatter: (params) => {
        if (!params.value) return 'ERROR';
        return Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(params.value);
      },

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
      valueFormatter: (params) => {
        return params.value ? `${(params.value as number).toFixed(2)} / 5` : `NA`;
      },
    },
  ];

  ngOnInit(): void {
    this.loading$?.subscribe((loading) => {
      if (loading) this.gridOptions.api?.showLoadingOverlay();
      else this.gridOptions.api?.hideOverlay();
    });

    this.intervalService
      .refresh(() =>
        this.searchText ? this.productService.filterProducts(this.searchText) : this.productService.getAll(),
      )
      .pipe(takeUntil(this.subscription$))
      .subscribe();
  }

  gridReady(params: any) {
    params.api.showLoadingOverlay();
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

  add() {
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent)
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.addProduct(newProduct)),
      )
      .subscribe();
  }

  setSearchText(searchText: string) {
    this.searchText = searchText;
  }

  ngOnDestroy(): void {
    this.subscription$.complete();
  }
}
