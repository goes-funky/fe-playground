import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from './product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

// components
import * as fromComponents from '../components/';
import { SharedModule } from '../../shared/shared.module';


// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
];

@NgModule({
  declarations: [ProductListComponent, ...fromComponents.components],
  exports: [ProductListComponent, ...fromComponents.components],
  imports: [
    CommonModule,
    AgGridModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ProductDetailModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class ProductListModule { }
