import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Product } from '../products.component.model';

@Component({
  selector: 'y42-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProductDetailComponent, Partial<Product>>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private product: Product,
  ) {}

  readonly form = new FormGroup({
    id: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    title: new FormControl('', { validators: [Validators.required, Validators.minLength(2), this.noWhitespaceValidator], nonNullable: true }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255), this.noWhitespaceValidator],
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

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
}
