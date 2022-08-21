import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class ProductListModule {}
