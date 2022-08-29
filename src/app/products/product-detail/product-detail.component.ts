import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Product } from '../product-http.service';

/**
 * a component for add or edit product whit reactive form
 */
@Component({
  selector: 'y42-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  form: FormGroup = new FormGroup({});

      /**
     * generate a new reactive form group whit form builder
     * @param bottomSheetRef reference of opened material bottomSheet
     * @param product selected product value
     * @param _fb reactive form builder
     */
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProductDetailComponent, Partial<Product>>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private product: Product,
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      id: [null, {nonNullable: true}],
      title: [null, {validators: [Validators.required, Validators.minLength(2)], nonNullable: true}],
      description: [
          null,
          {
              validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
              nonNullable: true,
          },
      ],
      stock: [0, {validators: [Validators.required, Validators.min(0)], nonNullable: true}],
      price: [0, {validators: [Validators.required, Validators.min(0)], nonNullable: true}],
      rating: [0, {nonNullable: true}],
      brand: [null, {nonNullable: true}],
  });
  }

  ngOnInit(): void {
    if (this.product.id) {
      this.form.patchValue(this.product);
  }
  }

  /**
     * call when user close dialog and dismiss that
     */
  cancel() {
    this.bottomSheetRef.dismiss();
  }

  /**
     * call when user submitted form and emit form value
     */
  submit() {
    this.bottomSheetRef.dismiss(this.form.value);
  }
}
