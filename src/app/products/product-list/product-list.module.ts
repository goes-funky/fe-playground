import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from './product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DateTimePipeModule } from 'src/app/utils/date-time-pipe/date-time-pipe.module';
import { ProductHeaderModule } from '../product-header/product-header.module';

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    ProductDetailModule,
    DateTimePipeModule,
    ProductHeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
    ]),
  ],
})
export class ProductListModule { }
