import { Component } from '@angular/core';

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <div style='display: flex'>
        <h2 style='margin: 0'>Products</h2>
        <button style='margin-left: auto' mat-raised-button color="primary" routerLink='/detail'>Add new product</button>
      </div><br>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent {}
