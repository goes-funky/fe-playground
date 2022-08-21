import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, interval, Observable, Subscription, tap, timer, takeUntil, startWith } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) { }

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly interval$$ = new BehaviorSubject<number>(0);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;
  readonly interval$: Observable<number> = this.interval$$;

  timer!: Subscription;

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => { this.loading$$.next(false), this.startTimer() }),
    );
  }

  startTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.timer = interval(60000).pipe(
      startWith(0),
    ).subscribe((val: number) => {
      this.interval$$.next(val*60)
    })
  }

  searchAll(key: string) {
    this.loading$$.next(true);
    return this.productHttp.search(key).pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => { this.loading$$.next(false), this.startTimer() }),
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

        this._updateProduct({ ...product, ...newProduct }, id);
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

        this._updateProduct({ ...product, stock: newStock }, id);
      }),
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

        this._updateProduct({ ...product, price: newPrice }, id);
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  private _updateProduct(product: Product, id?: number) {
    const products = this.products$$.getValue();
    if (id) {
      this.products$$.next([...products.filter((product) => product.id !== id), product]);
    } else {
      this.products$$.next([...products, product]);
    }
  }

  newProduct(newProduct: Product) {
    this.loading$$.next(true);

    return timer(750).pipe(
      tap(() => {
        if (!newProduct) {
          return;
        }

        this._updateProduct({ ...newProduct });
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }
}
