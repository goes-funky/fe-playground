import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ColDef, GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
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
  searchControl:FormControl = new FormControl();
  ngOnInit(): void {
    this.productService.getAll().subscribe();
    this.applySearch();
    
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
    // console.log('@openProduct() >> product >> ', product);
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
   * Function called when user try to add new Product
   */
  addProduct(){
  let product!: Product;
    this.bottomSheet
    .open<ProductDetailComponent, Product, Product>(ProductDetailComponent, { data: product })
    .afterDismissed()
    .pipe(
      filter(Boolean),
      switchMap((newProduct) => this.productService.addProduct(newProduct)),
    )
    .subscribe((res) => {
      // console.log('@Results of Adding new Product >> ',  res);
    });
  }

  /**
   * Function called when user try to search
   */
  applySearch() {
    this.searchControl.valueChanges.pipe(
      tap(value => {
        //console.log('@newSearchValue>> ', value)
      }),
      debounceTime(1000),
      switchMap(() => this.productService.searchProducts(this.searchControl.value))
    ).subscribe((res) => {
      // console.log('@Results of Search >> ',  res);
    });
  }


}
