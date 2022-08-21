import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer } from 'rxjs';
import { Product, ProductHttpService } from '../product-http-service/product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {
    this.getAll().subscribe();
  }

  private readonly loading$$ = new BehaviorSubject<boolean>(false);

  readonly products$$ = new BehaviorSubject<Product[]>([]);
  readonly loading$: Observable<boolean> = this.loading$$;

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  addNewProduct(newProduct: Product) {
    const currentProducts = this.products$$.getValue();
    this.setProductArray([newProduct, ...currentProducts]);
  }

  setProductArray(products: Product[]): void {
    this.products$$.next(products);
  }

  updateProduct(id: number | null, newProduct: Partial<Product>) {
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

  updateStock(id: number | null, newStock: number) {
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

  updatePrice(id: number | null, newPrice: number) {
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

  private _updateProduct(id: number | null, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }
}
