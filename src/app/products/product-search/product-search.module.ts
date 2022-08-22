import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  exports: [ProductSearchComponent],
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ProductSearchModule { }
