import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { Product, ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';

@Component({
  selector: 'y42-products',
  styles: [
   ` .title {
      display: block;
      height: 30px;
      padding: 4px 6px;
      font-size: 16px;
      color: #000000;
      margin-bottom: 13px;
      clear: both;
    }    
    .title .date {
      float: right;
    }      
    .title .name {
      float: left;
      margin-top: -19px;
    }`
  ],
  template: `
    <div style="height: 100%; padding: 1rem">
    <div class="title"><button class="date" mat-raised-button color="primary">Add Product</button>
    <mat-form-field class="name">
    <mat-icon matPrefix>search</mat-icon>
    <input matInput #searchInput  placeholder="Search"  type="text" [(ngModel)]="searchString" (keydown.enter)="enterPressed()" >
    <button mat-icon-button matSuffix (click)="clear()" *ngIf="searchInput.value">
        <mat-icon>
            close
        </mat-icon>
    </button>
    </mat-form-field></div>
      <h2>Products</h2>    
      <router-outlet></router-outlet>
    </div>

  
  `,
})
export class ProductsComponent implements OnInit { 
  searchUpdate: Subject<string> = new Subject();

  public searchString : string="";

  constructor(private productService: ProductService,
              private productHttp: ProductHttpService) {

   }
  ngOnInit() {
    
  }

  enterPressed(){
  
    this.productHttp.searchProduct(this.searchString)
    .subscribe((data: any) => {
    this.productService.products$$.next(data.products);
    console.log("inside preeeneter",data.products)}
    );

    console.log("search result",this.productService.searchProduct(this.searchString));
  }

  clear(): void {
    this.searchString= '';
    this.searchUpdate.next(this.searchString);
}

}
