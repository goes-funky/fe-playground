import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent,ProductAddComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    FormsModule,ProductDetailModule,
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
  ],providers:[ { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }]
})
export class ProductsModule {}
