import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, finalize, Observable, tap, timer } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  /**
   * Getting all searched Products
   * @param key searching Key
   */
  getProducts(key: string) {
    
    this.productHttp.getAll()
    .pipe(
      distinctUntilChanged(),
      debounceTime(300),
      tap((response) => {
        this.loading$$.next(true);

        const products = response.products || this.products$$.getValue();

        key = key.toLocaleLowerCase()
        const filteredProducts = products.filter((product: Product) => {
          return (
            (product.title.toLowerCase().startsWith(key)) ||
            (product.brand.toLowerCase().startsWith(key)) ||
            (product.description.toLowerCase().startsWith(key)) ||
            (product.stock.toString().startsWith(key)) );
        })

        this.products$$.next(filteredProducts);
      }),
      finalize(() => this.loading$$.next(false))
    ).subscribe();
  }

  /**
   * Adding new product
   * @param newProduct Product obj based on Interface
   * @returns Observable with new product included
   */
  addProduct(newProduct: Partial<Product>) {
    this.loading$$.next(true);

    return timer(750).pipe(
      tap(() => {
        const products =  this.products$$.getValue();
        const id = products[products.length - 1].id + 1;
        const product = this.products$$.getValue().find((product) => product.id);

        if (!product) {
          return;
        }

        this._updateProduct(id, { ...product, ...newProduct });
      }),
      finalize(() => this.loading$$.next(false))
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
}
