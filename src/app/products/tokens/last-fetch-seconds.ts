import { inject, InjectionToken } from '@angular/core';
import { filter, Observable, switchMap, timer } from 'rxjs';
import { ProductService } from '../product.service';

export const LAST_FETCH_SECONDS = new InjectionToken('Number of seconds from last fetch', {
  providedIn: 'root',
  factory: (): Observable<number> => {
    return inject(ProductService).products$.pipe(switchMap(() => timer(0, 1000).pipe(filter((x) => !(x % 60)))));
  },
});
