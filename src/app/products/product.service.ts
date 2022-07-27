import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, of, startWith, Subject, switchMap, tap, timer } from 'rxjs';
import { Loadable as loadable } from '../core/decorators/loadable.decorator';
import { DummyResponse, Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {
  }

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;

  readonly requestTick$ = new Subject();

  @loadable()
  getAll(): Observable<DummyResponse<Product>> {
    return this.productHttp.getAll().pipe(tap((response) => this.products$$.next(response.products)));
  }

  @loadable()
  updateProduct(id: number, newProduct: Partial<Product>): Observable<Product> {
    return this.requestUpdate(id, newProduct);
  }

  @loadable()
  updateStock(id: number, newStock: number): Observable<Product> {
    return this.requestUpdate(id, { stock: newStock });
  }

  @loadable()
  updatePrice(id: number, newPrice: number): Observable<Product> {
    return this.requestUpdate(id, { price: newPrice });
  }

  @loadable()
  addProduct(newProduct: Product): Observable<Product> {
    return this.productHttp.fakeAdd(newProduct).pipe(
      tap(newProduct => newProduct && this._addProductTOList(newProduct)),
    )
  }

  @loadable()
  searchProducts(search: string) {
    return this.productHttp.findProducts(search).pipe(tap((response) => this.products$$.next(response.products)));
  }


  private requestUpdate(id: number, objWithParam: Partial<Product>) {
    return this.productHttp.fakeUpdate(id, { ...objWithParam }).pipe(
      map(partial => this.fakeMap(partial)),
      tap(updatedProduct => updatedProduct && this._updateProduct(updatedProduct.id, updatedProduct)),
    )
  }

  /**
   * Fake map like we received an updated object from server
   * Returns The locally stored Product as it could be returned by server
   */
   private fakeMap(partialProduct: Partial<Product>): Product {
    return { ...this.products$$.getValue().find(product => product.id === partialProduct.id), ...partialProduct} as Product;
  }

  private _updateProduct(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }

  private _addProductTOList(product: Product) {
    this.products$$.next([...this.products$$.getValue(), product]);
  }
}
