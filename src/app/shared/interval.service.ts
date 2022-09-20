import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, interval, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class intervalService {
  private readonly updateTime$$ = new BehaviorSubject<number>(0);
  readonly updateTime$: Observable<number> = this.updateTime$$;

  refresh(callback: () => void) {
    // yet to implement
    return interval(10000).pipe(
      tap((time) => this.updateTime$$.next(time)),
      finalize(callback),
    );
  }
}
