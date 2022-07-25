import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'y42-login-page',
  templateUrl: './login-page.component.html',
  styles: [
    `
      .full-width {
        width: 100%;
      }

      .login-card {
        min-width: 120px;
        margin: 20px auto;
      }

      .mat-radio-button {
        display: block;
        margin: 5px 0;
      }

      .row {
        display: flex;
        flex-direction: row;
      }

      .col {
        flex: 1;
        margin-right: 20px;
      }

      .col:last-child {
        margin-right: 0;
      }
    `,
  ],
})
export class LoginPageComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.logout().subscribe();
  }

  readonly form = new FormGroup({
    email: new FormControl('a@a.a', [Validators.required, Validators.minLength(2), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  onSubmit() {
    const { email, password } = this.form.value;
    this.auth
      .login(email!, password!)
      .pipe(tap(() => this.router.navigateByUrl('/', { replaceUrl: true })))
      .subscribe();
  }
}
