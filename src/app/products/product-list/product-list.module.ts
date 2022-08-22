import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductSearchModule } from '../product-search/product-search.module'
import { ProductListComponent } from './product-list.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    ProductDetailModule,
    MatButtonModule,
    ProductSearchModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
    ]),
  ],
})
export class ProductListModule { }
