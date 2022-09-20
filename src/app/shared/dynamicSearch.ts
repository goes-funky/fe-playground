import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export function dynamicSearch<T, R>(callback: (query: T) => Observable<R>, delay = 250) {
  return (source$: Observable<T>) => source$.pipe(debounceTime(delay), distinctUntilChanged(), switchMap(callback));
}
