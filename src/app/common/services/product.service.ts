import {Injectable} from '@angular/core';
import {
    BehaviorSubject,
    combineLatestWith,
    finalize,
    Observable,
    startWith,

    tap,
    timer
} from 'rxjs';
import {ProductHttpService} from './product-http.service';
import {Product} from "../interfaces/product.interface";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ProductService {
    constructor(private productHttp: ProductHttpService) {
    }

    private readonly loading$$ = new BehaviorSubject<boolean>(false);
    private readonly products$$ = new BehaviorSubject<Product[]>([]);

    readonly products$: Observable<Product[]> = this.products$$;
    readonly loading$: Observable<boolean> = this.loading$$;
    /**
     * Using combineLatestWith is beneficial because once all sources emit
     * at least one value, all of the latest values will be emitted as an array.
     * The timer() will emit a new value which would be checked every 60s, hence the interval period with the previous emited date (lastDateUpdated).
     * */

    readonly lastFetchedMoment$$: Observable<number> = timer(1000, 1000 * 60 ).pipe(
        startWith(1),
        combineLatestWith(this.products$.pipe(map(() => new Date()))),
        map(([_, lastDateUpdated]: [any, Date]) => Math.round((new Date().getTime() - lastDateUpdated.getTime()) / 1000)),
    )

    getAll() {
        this.loading$$.next(true);
        return this.productHttp.getAll().pipe(
            tap((response) => this.products$$.next(response.products)),
            finalize(() => this.loading$$.next(false)),
        );
    }
    searchByPhone(phone:string){
        this.loading$$.next(true);
        return this.productHttp.searchByPhone(phone).pipe(
            tap((response) => this.products$$.next(response.products)),
            finalize(() => this.loading$$.next(false)),
        );
    }


    addProduct(newProduct: Product) {
        this.loading$$.next(true);
        return timer(750).pipe(
            tap(() => this._addProduct(newProduct)),
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

                this._updateProduct(id, {...product, ...newProduct});
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

                this._updateProduct(id, {...product, stock: newStock});
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

                this._updateProduct(id, {...product, price: newPrice});
            }),
            finalize(() => this.loading$$.next(false)),
        );
    }

    private _updateProduct(id: number, product: Product) {
        const products = this.products$$.getValue();
        this.products$$.next([...products.filter((product) => product.id !== id), product]);
    }

    private _addProduct(product: Product) {
        const products = this.products$$.getValue();
        this.products$$.next([product, ...products]);
    }
}
