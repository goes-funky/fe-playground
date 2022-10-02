import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  private lastTimeProductsUpdated$$ = new BehaviorSubject<number>(new Date().getTime());

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;
  readonly lastTimeProductsUpdated$: Observable<number> = this.lastTimeProductsUpdated$$;

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

  addProduct(newProduct: Product){
    this.loading$$.next(true);
    return timer(750).pipe(
      tap(() => {
        newProduct.id = new Date().getTime();
        this._addProduct(newProduct);
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  searchProduct(query: string) {
    this.loading$$.next(true);
    return this.productHttp.search(query).pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  private _setProductsUpdatedTime(timeStamp: number) {
    this.lastTimeProductsUpdated$$.next(timeStamp);
  }

  private _productsListUpdated() {
    this._setProductsUpdatedTime(new Date().getTime());
  }

  private _updateProduct(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
    this._productsListUpdated();
  }

  private _addProduct(product: Product) {
    const products = this.products$$.getValue();
    products.push(product);
    this.products$$.next([...products]);
    this._productsListUpdated();
  }
}
