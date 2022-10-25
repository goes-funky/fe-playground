import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductCreateComponent } from './product-create/product-create.component';

@NgModule({
  exports: [ProductDetailComponent],
  declarations: [ProductDetailComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'add',
        component: ProductDetailComponent,
      },
    ]),
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class ProductDetailModule {}
