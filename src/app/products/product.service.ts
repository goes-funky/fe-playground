import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, Subject, switchMap, tap, timer } from 'rxjs';
import { GetProductsQueryParams, Product } from '../models/product';
import { ProductHttpService } from './product-http.service';

const DEFAULT_PRODUCT_VALUES: Partial<Product> = {
  rating: 0,
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;

  private readonly fetchProduct: Subject<GetProductsQueryParams> = new Subject();
  private readonly fetchProductSideEffect = this.fetchProduct
    .asObservable()
    .pipe(
      tap(() => this.loading$$.next(true)),
      switchMap((params: GetProductsQueryParams) =>
        this.productHttp.getAll(params).pipe(
          tap((response) => this.products$$.next(response.products)),
          finalize(() => this.loading$$.next(false)),
        ),
      ),
    )
    .subscribe();

  getAll(params: GetProductsQueryParams = {}): void {
    this.fetchProduct.next(params);
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

  public addProduct(newProduct: Partial<Product>): Observable<Product> {
    this.loading$$.next(true);

    return this.productHttp.post({ ...DEFAULT_PRODUCT_VALUES, ...newProduct }).pipe(
      tap((productFromResponse) => this._updateProduct(productFromResponse.id, { ...productFromResponse })),
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
}
