import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from './product-list.component';
import { DatesAgoModule } from 'src/app/Utility/pipes/DateAgoModule';


@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],

  imports: [
    CommonModule,
    AgGridModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    ProductDetailModule,
    DatesAgoModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
    ]),
  ],
})
export class ProductListModule {}
