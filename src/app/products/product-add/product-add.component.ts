import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

productToAdd: Product={} as Product;
searchKey:string|undefined;
@Input()
isAddEnabled:boolean=false;


  constructor(private _productService:ProductService) { }

  ngOnInit() {
  }
  disableAdd(){
    this.isAddEnabled = false;
    (document.getElementById("addEnabled") as any).checked=false;
  }
  onSearch($event:any){
    console.log(this.searchKey)
    if(this.searchKey)
    this._productService.search(this.searchKey).subscribe(x=>{
      console.log(x);
    })
  }

}
