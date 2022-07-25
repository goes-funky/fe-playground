import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, tap, timer } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
}

const lsUserKey = 'y42-test-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user$$ = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem(lsUserKey) || 'null') ?? null,
  );
  private readonly loading$$ = new BehaviorSubject(false);

  readonly user$: Observable<User | null> = this.user$$;
  readonly loggedIn$ = this.user$.pipe(map((user) => !!user));

  readonly loading$: Observable<boolean> = this.loading$$;

  login(email: string, password: string) {
    this.loading$$.next(true);
    return timer(500).pipe(
      map(() => ({
        id: '1',
        email,
        name: email.split('@')[0],
      })),
      tap((user) => this.user$$.next(user)),
      tap((user) => localStorage.setItem(lsUserKey, JSON.stringify(user))),
      finalize(() => this.loading$$.next(false)),
    );
  }

  logout() {
    this.loading$$.next(true);
    return timer(250).pipe(
      tap(() => this.user$$.next(null)),
      tap(() => localStorage.removeItem(lsUserKey)),
      finalize(() => this.loading$$.next(false)),
    );
  }
}
