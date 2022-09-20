import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProductService } from '../../products/product.service';

import { dynamicSearch } from '../dynamicSearch';

@Component({
  selector: 'y42-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string = 'Search';
  @Output() searchText = new EventEmitter();

  private searchSub = new Subject<string>();

  form = this.fb.group({
    searchText: new FormControl(''),
  });

  constructor(private fb: FormBuilder, private service: ProductService) {}

  ngOnInit() {
    this.searchSub.pipe(dynamicSearch((query) => this.service.filterProducts(query))).subscribe();
  }

  filter(searchText: string) {
    this.searchText.emit(searchText);
    this.searchSub.next(searchText);
  }
}
