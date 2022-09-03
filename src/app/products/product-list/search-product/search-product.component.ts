import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {debounceTime, iif, mergeMap, Observable, of, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../product.service";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'y42-search-product',
  templateUrl: `search-product.component.html`,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductComponent implements OnInit {

  searchParam$: Observable<string> =  this.activatedRoute.queryParams.pipe(
      debounceTime(500),
      mergeMap((query: any) => iif(
          () => 'search' in query,
          this.productService.search(query.search).pipe(map(() => query.search)),
          of('')
      ))
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
