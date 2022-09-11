import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductSearchComponent } from './product-search.component';

@NgModule({
  exports: [ProductSearchComponent],
  declarations: [ProductSearchComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
})
export class ProductSearchModule {}
