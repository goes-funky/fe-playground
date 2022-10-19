import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ProductListComponent } from './product-list.component';
import { ProductResolverService } from './product.resolver.service';

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
        resolve: {
          product: ProductResolverService
        }
      },
    ]),
  ],
  providers: [ProductResolverService]
})
export class ProductListModule {}
