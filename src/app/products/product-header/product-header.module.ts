import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductHeaderComponent } from './product-header.component';


@NgModule({
    declarations: [ProductHeaderComponent],
    exports: [ProductHeaderComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
    ],
})
export class ProductHeaderModule { }
