import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'y42-product-search',
  templateUrl: `./product-search.component.html`,
  styles: [
  ]
})
export class ProductSearchComponent implements OnInit {
  public userSearchInput: string = '';
  userSearchInputUpdate = new Subject<string>();
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.userSearchInputUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.productService.getSearchResults(value)?.subscribe();
      });
  }

}
