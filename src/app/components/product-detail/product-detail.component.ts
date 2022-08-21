import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Product, ProductHttpService } from '../../services/product-http-service/product-http.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service/product.service';

@Component({
  selector: 'y42-product-detail',
  templateUrl: './product-detail.component.html',
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
export class ProductDetailComponent implements OnInit {

  submitBtnLoading = false;

  constructor(
    private productService: ProductService,
    private productHttpService: ProductHttpService,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<ProductDetailComponent, Partial<Product>>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private product: Product,
  ) {
  }

  readonly form: FormGroup = new FormGroup({
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
    this.createProduct(this.form.value);
  }

  createProduct(product: any): void {
    this.submitBtnLoading = true;
    this.productHttpService.createProduct(product)
      .subscribe((product: Product) => {
        this.router.navigate(['/products']);
        this.productService.addNewProduct(product);
      })
  }
}
