import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    ProductDetailModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
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
