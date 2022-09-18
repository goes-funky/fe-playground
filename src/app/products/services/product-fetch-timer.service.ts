import { Injectable } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { map, takeUntil, repeatWhen } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FetchTimerService {
  readonly observable$: Observable<number>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  constructor() {
    this.observable$ = timer(0,1000).pipe(
      map((val) => val),
      takeUntil(this._stop),
      repeatWhen(() => this._start),
    );
  }

  private start(): void {
    this._start.next();
  }

  private stop(): void {
    this._stop.next();
  }

  public reset(): void {
    this.stop();
    this.start();
  }
}
