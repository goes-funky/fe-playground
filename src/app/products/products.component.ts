import { Component } from '@angular/core';

@Component({
  selector: 'y42-products',
  templateUrl:'products.component.html'
})
export class ProductsComponent {
  isAddEnabled=false;

  toggleNewProduct(){
    this.isAddEnabled=!this.isAddEnabled;
    (document.getElementById("addEnabled") as any).checked=this.isAddEnabled;
  }
}