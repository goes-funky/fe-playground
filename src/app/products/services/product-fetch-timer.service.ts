import { Injectable } from '@angular/core';
import { BehaviorSubject, scan, timer, tap, takeWhile, repeat, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFetchTimerService {
  private readonly timer$$ = new BehaviorSubject<number>(0);
  readonly timer$ = this.timer$$;

  GRID_RELOAD_TIME = 60;

  init(callback: () =>  void) {
    return timer(0, 1000).pipe(
      scan((acc) => --acc, this.GRID_RELOAD_TIME),
      tap((time) => this.timer$$.next(time)),
      takeWhile((remainingTime) => remainingTime > 0),
      finalize(callback),
      repeat(),
    );
  }
}
