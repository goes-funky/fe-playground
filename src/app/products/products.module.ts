import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddProductModule } from './add-product/add-product.module';
import { ProductsComponent } from './products.component';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    AddProductModule,
    SearchModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./product-list/product-list.module').then((m) => m.ProductListModule),
          },
        ],
      },
    ]),
  ],
})
export class ProductsModule {}
