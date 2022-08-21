import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../app/angular-material.module';
@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    AgGridModule,
    ProductDetailModule,
    ReactiveFormsModule,
    AngularMaterialModule,
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
