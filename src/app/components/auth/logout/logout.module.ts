import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule } from '@angular/router';
import { map, switchMap, timer } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return timer(250).pipe(
      switchMap(() => this.auth.logout()),
      map(() => this.router.parseUrl('/login')),
    );
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        children: [],
        canActivate: [LogoutGuard],
      },
    ]),
  ],
  declarations: [],
})
export class LogoutModule {}
