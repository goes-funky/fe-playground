import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-search',
  template: `
    <form [formGroup]="form" novalidate>
      <mat-form-field appearance="fill">
        <mat-label>Search</mat-label>
        <input matInput placeholder="Search Product" formControlName="search" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
    </form>
  `,
})
export class ProductSearchComponent implements OnInit {
  constructor(private productService: ProductService) {
    this._createForm();
  }

  // UI variables
  form!: FormGroup;
  search: FormControl = new FormControl('');

  // life cycle events
  ngOnInit(): void {
    this._addSubscriberToSearch();
  }

  // private methods
  private _createForm() {
    this.form = new FormGroup({
      search: this.search,
    });
  }

  private _addSubscriberToSearch(): void {
    this.search.valueChanges.pipe(debounceTime(2000)).subscribe((data: string) => {
      // if we get search term then we show details for that
      if (data) {
        this.productService.searchProduct(data).subscribe();
      } else {
        // if user removes search term then we show default get all values
        this.productService.getAll().subscribe();
      }
    });
  }
}
