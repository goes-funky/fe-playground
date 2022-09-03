import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from './product-list.component';
import { SearchProductComponent } from './search-product/search-product.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProductListComponent, SearchProductComponent],
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
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class ProductListModule {}
