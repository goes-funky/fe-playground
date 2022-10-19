import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes = [
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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
