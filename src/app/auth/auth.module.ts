import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then((m) => m.LogoutModule),
      },
    ]),
  ],
})
export class AuthModule {}
