import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer, switchMap, catchError, throwError, Subject } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';
import moment from "moment";

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) { }

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  private readonly timer$$ = new Subject<moment.Moment>();

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;
  readonly timer$: Observable<moment.Moment> = this.timer$$.asObservable();

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => {
        this.loading$$.next(false);
        this._updateTimer(new Date());
      }),
    );
  }

  /*  Add a new product to the list*/
  addProduct(product: Product) {
    this.loading$$.next(true);
    return timer(750).pipe(
      switchMap(() => this.productHttp.add(product)),
      tap((response) => this._addProduct(response)),
      catchError((err) => {
        console.log('Handling error and rethrowing it...', err);
        return throwError(() => err);
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  /*  Search Products by query parameters */
  searchProducts(products: string) {
    this.loading$$.next(true);
    return this.productHttp.search(products).pipe(
      tap((response) => {
        this.products$$.next(response.products);
      }),
      catchError((err) => {
        console.log('Handling error and rethrowing it...', err);
        return throwError(() => err);
      }),
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

  private _updateProduct(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }

  /*  Updates the timer with the after each call to get the product*/
  private _updateTimer(date: moment.MomentInput) {
    this.timer$$.next(moment(date));
  }

  /* Helper functions to add new products */
  private _addProduct(product: Product) {
    const products = this.products$$.getValue();
    products.push(...[product]);
    this.products$$.next([...products]);
  }
}
