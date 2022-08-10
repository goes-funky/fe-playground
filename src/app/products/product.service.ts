import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer, take } from 'rxjs';
import { Product, ProductHttpService, ProductId } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  private readonly date$$ = new BehaviorSubject<Product[]>([]);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;

  search(text: string) {
    this.loading$$.next(true);
    return this.productHttp.search(text).pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    )
  }

  update(id: ProductId, product: Partial<Product>) {
    this.loading$$.next(true);
    const products = this.products$$.getValue();
    return timer(750).pipe(
      tap(() => {
        const findProduct = products.find((product) => product.id === id);
        if (findProduct) {
          this.products$$.next([...products.filter((product) => product.id !== id), {...findProduct, ...product}]);
        }
      }),
      finalize(() => this.loading$$.next(false)),
    )
  }
}
