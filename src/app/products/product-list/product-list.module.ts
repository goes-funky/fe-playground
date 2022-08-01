import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { TimerComponent } from './timer/timer.component';
import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent, TimerComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    ProductDetailModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
    ]),
  ],
})
export class ProductListModule {}
