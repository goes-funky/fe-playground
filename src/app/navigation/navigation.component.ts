import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import {combineLatest, firstValueFrom, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ProductDetailComponent} from "../products/product-detail/product-detail.component";
import {Product} from "../products/product-http.service";
import {ProductService} from "../products/product.service";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
      private breakpointObserver: BreakpointObserver,
      private auth: AuthService,
      private bottomSheet: MatBottomSheet,
      private productService: ProductService,
      private _snackBar: MatSnackBar
  ) {}

  readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  readonly loggedIn$ = this.auth.loggedIn$;

  readonly sideNavOpened$ = combineLatest([this.isHandset$, this.loggedIn$]).pipe(
    map(([handset, loggedIn]) => !handset && loggedIn),
  );

  async addProduct() {
    const res = await firstValueFrom(this.bottomSheet
        .open<ProductDetailComponent, any, Product>(ProductDetailComponent, { data: {} })
        .afterDismissed());
    if (!res) {
      return;
    }
    const {id, ...newProduct} = res;
    await firstValueFrom(this.productService.addProduct(newProduct));
    this._snackBar.open('Product added', 'ok!', {
      duration: 2000
    });
  }
}
