import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../app/angular-material.module';

@NgModule({
  exports: [],
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild([{
      path: '',
      component: ProductDetailComponent
    }])
  ]
})
export class ProductDetailModule {}
