import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { MatButtonModule } from "@angular/material/button";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [ProductsComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatBottomSheetModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProductsComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./components/product-list/product-list.module').then((m) => m.ProductListModule),
                    },
                ],
            },
        ]),
    ],
})
export class ProductsModule {}
