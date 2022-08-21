import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    ProductDetailModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: 'products',
            component: ProductListComponent
          },
          {
            path: 'detail',
            loadChildren: () => import('../product-detail/product-detail.module').then((m) => m.ProductDetailModule),
          }
        ],
      },
    ]),
  ],
})
export class ProductsModule {}
