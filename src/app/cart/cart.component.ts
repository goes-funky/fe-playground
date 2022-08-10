import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';

import { CartService } from './cart.service';

@Component({
  selector: 'y42-cart',
  styles: [`
    .item {
      display: flex;
      align-items: top;
      margin-bottom: 12px;
    }

    .title {
      width: 400px;
      flex: 0 1 auto;
    }

    .remove {
      margin-left: 15px;
    }

    .count {
      align-self: center;
    }

    .controls {
      margin-left: auto;
      margin-top: 16px;
    }
  `],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  readonly cartItems$$ = this.cartService.items$;
  readonly cartItemsPrice$$ = this.cartService.items$.pipe(map(list => 
    Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(list.reduce((c,p) => c + p.count * p.data.price, 0)))
  );
  constructor(private readonly cartService: CartService) {}

  changeCount(i: number, event: Event) {
    this.cartService.changeCount(i, +(event.target as HTMLInputElement).value)
  }

  remove(i: number) {
    this.cartService.remove(i);
  }

  clear() {
    this.cartService.clear();
  }
}
