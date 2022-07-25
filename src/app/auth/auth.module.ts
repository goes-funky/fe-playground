import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'login',
        loadChildren: () => import('./login/login-page.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'logout',
        loadChildren: () => import('./logout/logout-page.module').then((m) => m.LogoutPageModule),
      },
    ]),
  ],
})
export class AuthModule {}
