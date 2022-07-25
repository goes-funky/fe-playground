import { Component } from '@angular/core';

@Component({
  selector: 'y42-products',
  template: `
    <div style="height: 100%; padding: 1rem">
      <h2>Products</h2>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ProductsComponent {
  constructor() {}
}
