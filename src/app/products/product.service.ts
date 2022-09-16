import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, iif, Observable, of, switchMap, tap, timer } from 'rxjs';
import { ProductHttpService, ProductsResponse } from './product-http.service';
import { Product, productInitialState } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {
  }

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  private readonly searchResults$$ = new BehaviorSubject<Product[] | null>(null);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly searchResults$: Observable<Product[] | null> = this.searchResults$$;
  readonly loading$: Observable<boolean> = this.loading$$;

  readonly filteredProducts$ = this.searchResults$
    .pipe(
      switchMap((searchResult) =>
        iif(() => searchResult === null, this.products$, this.searchResults$),
      ),
    );

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  updateProduct(id: number, newProduct: Partial<Product>) {
    this.loading$$.next(true);

    return timer(750).pipe(
      tap(() => {
        const product = this.products$$.getValue().find((product) => product.id === id);

        if (!product) {
          return;
        }

        this._updateProduct(id, { ...product, ...newProduct });
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  updateStock(id: number, newStock: number) {
    this.loading$$.next(true);

    return timer(750).pipe(
      tap(() => {
        const product = this.products$$.getValue().find((product) => product.id === id);

        if (!product) {
          return;
        }

        this._updateProduct(id, { ...product, stock: newStock });
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  addProduct(newProduct: Partial<Product>) {
    this.loading$$.next(true);

    return this.productHttp.add(newProduct).pipe(
      tap((response) => this._addProduct({ ...productInitialState, ...newProduct, ...response })),
      finalize(() => this.loading$$.next(false)),
    );
  }

  updatePrice(id: number, newPrice: number) {
    this.loading$$.next(true);

    return timer(750).pipe(
      tap(() => {
        const product = this.products$$.getValue().find((product) => product.id === id);

        if (!product) {
          return;
        }

        this._updateProduct(id, { ...product, price: newPrice });
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  search(query: string | null): Observable<null | ProductsResponse> {
    if (!query) {
      this.searchResults$$.next(null);
      return of(null);
    }

    this.loading$$.next(true);

    return this.productHttp.search(query!).pipe(
      tap((response) => this.searchResults$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  private _updateProduct(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }

  private _addProduct(product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products, product]);
  }
}
