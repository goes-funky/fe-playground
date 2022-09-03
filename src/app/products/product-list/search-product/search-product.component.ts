import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {debounceTime, mergeMap, Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../product.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'y42-search-product',
  templateUrl: `search-product.component.html`,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductComponent implements OnInit {

  searchParam$: Observable<string> =  this.activatedRoute.queryParams.pipe(
      debounceTime(900),
      mergeMap((query: any) => {
        if ('search' in query) {
            return this.productService.search(query.search).pipe(map(() => query.search));
        }
        return of('')
      })
  );

  constructor(
      private activatedRoute: ActivatedRoute,
      private productService: ProductService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  searchProduct(e: any) {
    this.router.navigate([], {queryParams: {search: e?.value || ''}})
  }

}
