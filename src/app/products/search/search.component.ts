import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-search',
  template: `
  <mat-form-field [formGroup]="form" appearance="fill">
    <mat-label>Search</mat-label>
    <input formControlName="search" matInput>
  </mat-form-field>
  <button mat-raised-button color="secondary" (click)="clearSearch()">Clear Search</button>
  `,
  styles: [
    `
    :host {
      float: right;
      position: absolute;
      top: 70px;
      right: 20px;
    }

    button {
      position: absolute;
      right: 210px;
      top: 10px;
    }
    `
  ]
})
export class SearchComponent implements OnInit {
  readonly form = new FormGroup({
    search: new FormControl<string | undefined>(undefined, { nonNullable: true }),
  });
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.form.get('search')?.valueChanges.pipe(
      filter((searchString) => {
        return searchString ? searchString.length > 3 : false;
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchStr) => {
        return this.productService.searchProducts(searchStr ?? '');
      })
    )
    .subscribe();
  }

  clearSearch() {
    this.productService.getAll().subscribe();
  }
}
