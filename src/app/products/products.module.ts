import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    MatBottomSheetModule,
    ProductDetailModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProductsModule {
}
