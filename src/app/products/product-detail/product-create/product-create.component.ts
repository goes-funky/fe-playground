import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Product } from '../../product-http.service';

@Component({
    selector: 'y42-product-create',
    templateUrl: './product-create.component.html',
    styles: [
        `
      .full-width {
        width: 100%;
      }

      .shipping-card {
        min-width: 120px;
        margin: 20px auto;
      }

      .mat-radio-button {
        display: block;
        margin: 5px 0;
      }

      .row {
        display: flex;
        flex-direction: row;
      }

      .col {
        flex: 1;
        margin-right: 20px;
      }

      .col:last-child {
        margin-right: 0;
      }
    `,
    ],
})
export class ProductCreateComponent implements OnInit {
    @Output() productCreate: EventEmitter<Product> = new EventEmitter();

    constructor(
        private bottomSheetRef: MatBottomSheetRef<ProductCreateComponent, Partial<Product>>,
        @Inject(MAT_BOTTOM_SHEET_DATA) private product: Product,
    ) {}

    form = new FormGroup({
        id: new FormControl<number | undefined>(undefined, { nonNullable: true }),
        title: new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
        description: new FormControl('', {
            validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
            nonNullable: true,
        }),
        stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
        price: new FormControl(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
    });

    ngOnInit(): void {
        this.form.patchValue(this.product);
    }

    cancel() {
        this.bottomSheetRef.dismiss();
    }

    submit() {
        this.productCreate.emit(this.form.value as Product);
    }
}
