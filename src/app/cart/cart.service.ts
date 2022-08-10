import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Product } from "../products/product-http.service";

interface CartItem<T> {
    data: T,
    count: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items$$ = new BehaviorSubject<CartItem<Product>[]>([]);
  readonly items$ = this.items$$.asObservable();

  add(product: Product) {
    const items = this.items$$.getValue();
    const findItem = items.findIndex(e => e.data.id === product.id);
    if (findItem >= 0) {
      items[findItem].count += 1;
      this.items$$.next(items);
    } else {
      this.items$$.next([...items, {data: product, count: 1}]);
    }
  }

  remove(index: number) {
    const items = this.items$$.getValue().filter((_,i) => i !== index);
    this.items$$.next(items);
  }

  changeCount(index: number, value: number) {
    const items = this.items$$.getValue();
    items[index].count = value;
    this.items$$.next(items);
  }

  clear() {
    this.items$$.next([]);
  }
}