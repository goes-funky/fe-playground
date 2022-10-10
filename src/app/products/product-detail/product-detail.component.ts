import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Product } from '../../services/product-http.service';

@Component({
  selector: 'y42-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProductDetailComponent, Partial<Product>>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private product: Product,
  ) {}

  readonly form = new FormGroup({
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
    this.bottomSheetRef.dismiss(this.form.value);
  }
}
