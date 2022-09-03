import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer } from 'rxjs';
import { Product, ProductHttpService} from './product-http.service';
import { DateTime, Interval } from 'luxon';
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  private whenFetched!: DateTime;
  private readonly sinceFetched$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private intervalRef: any;

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;
  readonly sinceFetched$: Observable<string> = this.sinceFetched$$;


  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      tap(() => this.generateInterval()),
      finalize(() => this.loading$$.next(false)),
    );
  }

  search(searchValue: string) {
    this.loading$$.next(true);
    return this.productHttp.search(searchValue).pipe(
      tap((response) => this.products$$.next(response.products)),
        tap(() => this.generateInterval()),
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

  addProduct(newProduct: Omit<Product, 'id'>) {
      this.loading$$.next(true);
      return this.productHttp.add(newProduct).pipe(
          tap(res => {
              const products = this.products$$.getValue();
              this.products$$.next([{...newProduct, id: res.id, rating: 0}, ...products]);
          }),
          finalize(() => this.loading$$.next(false)),
      );
  }

    private generateInterval() {
        if (this.intervalRef) {
            this.clearLabelInterval();
        }
        this.whenFetched = DateTime.now();
        this.generateLabel();
        this.intervalRef = setInterval(() => {
            this.generateLabel();
        }, 60000);
    }

    private generateLabel() {
        let label = 'Fetched now';
        const duration = Interval.fromDateTimes(this.whenFetched, DateTime.now()).length('seconds');
        if (Math.round(duration)) {
            label = `Fetched ${Math.round(duration)} seconds ago`;
        }
        this.sinceFetched$$.next(label);
    }

    clearLabelInterval() {
        clearInterval(this.intervalRef);
    }


    private _updateProduct(id: number, product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products.filter((product) => product.id !== id), product]);
  }
}
