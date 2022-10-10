import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProductDetailComponent } from './product-detail.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  exports: [ProductDetailComponent],
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
  ],
})
export class ProductDetailModule {}
