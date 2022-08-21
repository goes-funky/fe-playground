import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product-service/product.service';
import { Product, ProductHttpService } from '../../services/product-http-service/product-http.service';

@Component({
  selector: 'y42-products-filter',
  template: `
    <div class='container'>
      <form class='form' [formGroup]='form' (ngSubmit)='onFilterSubmit()'>
        <mat-form-field appearance='legacy'>
          <mat-label>Type text to filter...</mat-label>
          <input matInput formControlName='filter' id='filter-input'>
        </mat-form-field>
        <button mat-stroked-button color='primary' id='filter-button'>Search</button>

      </form>
      <span id='last-request-text'>Last update: {{lastRequest}} seconds ago.</span>
    </div>
  `,
  styles: [`
    .form {
      font-size: 15px;
    }
    
    .container {
      display: flex;
    }

    #filter-button {
      margin-left: 10px;
    }

    #last-request-text {
      font-size: 15px;
      margin-left: auto;
      display: inline-flex;
      align-items: center;
    }
  `],
})
export class ProductFilterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    filter: new FormControl<string>(''),
  });
  lastRequest: number = 0;

  constructor(private productHttpService: ProductHttpService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductsEveryMinute();
    this.lastRequestTimeChecker();
  }

  onFilterSubmit(): void {
    this.lastRequest = 0;
    this.productHttpService.filterProducts(this.form.value.filter)
      .subscribe((products: { products: Product[] }) => {
          this.productService.setProductArray(products.products);
        },
      );
  }

  getProductsEveryMinute(): void {
    setInterval(() => {
      this.productService.getAll().subscribe(() => {
        this.lastRequest = 0;
      });
    }, 60000);
  }

  lastRequestTimeChecker(): void {
    setInterval(() => {
      this.lastRequest++;
    }, 1000);
  }
}
