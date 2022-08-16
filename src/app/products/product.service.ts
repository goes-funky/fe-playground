import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer} from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;
  readonly seconds$$ = new BehaviorSubject('just now');
  private interval: any;

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => {
          this.loading$$.next(false);
          this.updateCounter();
      }),
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
      finalize(() => {
        this.loading$$.next(false);
        this.updateCounter();
      }),
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
      finalize(() => {
        this.loading$$.next(false);
        this.updateCounter();
      }),
    );
  }

  private _updateProduct(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }

  updateProductList(newProduct: Product) {
      this.loading$$.next(true)
      const products: Product[] = this.products$$.getValue()
      this.products$$.next([...products, newProduct])
      this.loading$$.next(false)
      this.updateCounter();
  }

  updateCounter() {
    const secondsPerMinute = 60;
    const updateTime = 60000;
    let minuteCount = 1;

    if(minuteCount === 1) {
      this.seconds$$.next('just now');
    }

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.seconds$$.next((minuteCount * secondsPerMinute).toString());
      minuteCount++;
    }, updateTime);
  }
}
