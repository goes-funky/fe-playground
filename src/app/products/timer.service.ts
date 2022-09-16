import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, repeat, scan, takeWhile, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly timer$$ = new BehaviorSubject<number>(0);
  readonly timer$: Observable<number> = this.timer$$;

  start(onRestart: () => void, minutes = 60) {
    return timer(0, 1000).pipe(
      scan(totalTime => ++totalTime, 0),
      tap((tick) => this.timer$$.next(tick)),
      takeWhile(x => x < minutes),
      finalize(onRestart),
      repeat(),
    );
  }
}
