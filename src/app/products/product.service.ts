import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap, timer } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttp: ProductHttpService) {}

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly products$$ = new BehaviorSubject<Product[]>([]);
  
  private readonly newProduct: Product = {
    id: 1,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  }

  readonly products$: Observable<Product[]> = this.products$$;
  readonly loading$: Observable<boolean> = this.loading$$;

  getAll() {
    this.loading$$.next(true);
    return this.productHttp.getAll().pipe(
      tap((response) => this.products$$.next(response.products)),
      finalize(() => this.loading$$.next(false)),
    );
  }

  getFiltered(query: string) {
    this.loading$$.next(true);

    return this.productHttp.getFiltered(query).pipe(
      tap((response) => {
        console.log(response)
        return this.products$$.next(response.products)
      }),
      finalize(()=> this.loading$$.next(false))
    )
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

  createProduct(newProduct: Partial<Product>) {
    this.loading$$.next(true);
    let prod:Product = {
      ...this.newProduct,
      ...newProduct
    }
    prod.id += this.products$$.getValue().length;
    console.log(prod)
    return timer(500).pipe(
      tap(() => {
        console.log(prod)
        this._createProduct(prod);
      }),
      finalize(()=> this.loading$$.next(false))
    )
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

  private _createProduct(product: Product) {
    const products = this.products$$.getValue();
    this.products$$.next([...products, product]);
  }
}
