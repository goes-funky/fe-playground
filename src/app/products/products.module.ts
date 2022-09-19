import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProductSearchModule } from './product-search/product-search.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductSearchModule,
    MatButtonModule,
    MatBottomSheetModule,
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
