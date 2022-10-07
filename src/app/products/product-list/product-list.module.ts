import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
// import { ProductsModule } from '../products.module';
import { ProductListComponent } from './product-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
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
