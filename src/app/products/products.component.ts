import { Component } from '@angular/core';

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <h2>Products</h2>
      <y42-add-product></y42-add-product>
      <y42-search></y42-search>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent {}
