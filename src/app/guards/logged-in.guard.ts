import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.loggedIn$.pipe(map((loggedIn) => loggedIn || this.router.parseUrl('/login')));
  }
}
