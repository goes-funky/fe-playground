import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product, ProductHttpService } from '../product-http.service';

@Component({
  selector: 'y42-products-filter',
  template: `
    <form [formGroup]='form' (ngSubmit)='onFilterSubmit()' style='margin-bottom: 10px'>
      <input formControlName='filter' placeholder='Type text...' id='searchInput' type='text'>
      <button style='margin-left: 5px' type='submit'>Search</button>
    </form>
    <span>Last: update: {{lastRequest}} seconds ago.</span>
  `,
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
    this.productHttpService.getProductsByGivenText(this.form.value.filter)
      .then(
        (products) => {
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
