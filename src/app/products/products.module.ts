import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./components/product-list/product-list.module').then((m) => m.ProductListModule),
          },
        ],
      },
    ]),
  ],
})
export class ProductsModule {}
