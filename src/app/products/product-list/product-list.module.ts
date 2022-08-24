import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {AgGridModule} from 'ag-grid-angular';
import {ProductDetailModule} from '../product-detail/product-detail.module';
import {ProductListComponent} from './product-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [ProductListComponent],
    exports: [ProductListComponent],
    imports: [
        CommonModule,
        AgGridModule,
        MatProgressSpinnerModule,
        MatBottomSheetModule,
        ProductDetailModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProductListComponent,
            },
        ]),
    ],
})
export class ProductListModule {
}
