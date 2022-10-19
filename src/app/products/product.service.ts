import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer } from 'rxjs';
import { IGETProductResponse, Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {
  }

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  private readonly updated$$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  readonly products$: Observable<Product[]> = this.products$$.asObservable();
  readonly loading$: Observable<boolean> = this.loading$$.asObservable();
  readonly updated$: Observable<number | null> = this.updated$$.asObservable();

  getAll(): Observable<IGETProductResponse> {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this._updateProducts(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  searchByQuery(query: string): Observable<IGETProductResponse> {
    this.loading$$.next(true);
    return this.productHttp.search(query).pipe(
      tap((response) => this._updateProducts(response.products)),
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

        this._updateProductById(id, { ...product, ...newProduct });
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  addProduct(newProduct: Product): Observable<Product> {
    this.loading$$.next(true);

    return this.productHttp.create(newProduct).pipe(
      tap((product: Product) => this._updateProductById(product.id, product)),
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

        this._updateProductById(id, { ...product, stock: newStock });
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

        this._updateProductById(id, { ...product, price: newPrice });
      }),
      finalize(() => this.loading$$.next(false)),
    );
  }

  private _updateProductById(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }

  private _updateProducts(products: Product[]): void {
    this.updated$$.next(Date.now());
    this.products$$.next(products);
  }
}
