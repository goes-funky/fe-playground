import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
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
