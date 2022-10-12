import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { combineLatest, debounceTime, filter, interval, map, Observable, startWith, switchMap } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'y42-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private bottomSheet: MatBottomSheet) {}

  readonly products$ = this.productService.products$;
  readonly loading$ = this.productService.loading$;
  readonly searchFormControl = new FormControl();

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
    this.subscrGetAllProducts();      
    this.subscrSearchFormControl();
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
        untilDestroyed(this),
      )
      .subscribe();
  }
  
  addProduct(): void {
    const newId = Math.floor(Math.random() * 100);
    const product: Product = {
      id: newId, title: '', brand: '', description: '', stock: 0, price: 0, rating: 0,
      discountPercentage: 0,
      category: '',
      thumbnail: '',
      images: []
    };
    
    this.bottomSheet
      .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: product })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap((newProduct) => this.productService.createProduct(newProduct)),
        untilDestroyed(this),
      )
      .subscribe();
  }
  
  private subscrGetAllProducts(): void {
    this.productService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe();
  }
  
  private subscrSearchFormControl(): void {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(400),
      switchMap((query: string) => this.productService.searchByString(query)),
      untilDestroyed(this),
    ).subscribe();
  }
}
