import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'y42-product-header',
  template: `
    <mat-card>
      <mat-card-content>
        <div class="row">
          <div class="container">
            <mat-form-field class="full-width">
              <input matInput placeholder="Enter search query" type="text" [formControl]="searchControl" />
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            <button (click)="addProductEvent.emit()" color="primary" id="add-btn" type="button" mat-mini-fab>
              <mat-icon>add</mat-icon>
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      #add-btn {
        float: right;
      }
    `,
  ],
})
export class ProductHeaderComponent implements OnInit {
  @Input() searchControl!: FormControl;
  @Input() time: any;
  @Output() addProductEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }
}
