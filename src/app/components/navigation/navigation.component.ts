import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'y42-navigation',
  templateUrl: './navigation.component.html',
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .container {
        height: calc(100% - 4.5rem);
        padding: 0 1rem;
        overflow: auto;
      }
    `,
  ],
})
export class NavigationComponent {
  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {}

  readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  readonly loggedIn$ = this.auth.loggedIn$;

  readonly sideNavOpened$ = combineLatest([this.isHandset$, this.loggedIn$]).pipe(
    map(([handset, loggedIn]) => !handset && loggedIn),
  );
}
