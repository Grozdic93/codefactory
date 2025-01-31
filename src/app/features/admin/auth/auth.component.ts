import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `
    <div class="auth-wrapper">
      <form (ngSubmit)="onSubmit()" [formGroup]="authForm">
        <input formControlName="email" type="email" placeholder="email" />
        <br />
        <input
          formControlName="password"
          type="password"
          placeholder="password"
        />
        <br />
        <button [disabled]="!authForm.valid" type="submit">
          {{ isLoginMode ? 'Login' : 'Sign Up' }}
        </button>
        <br />
        <br />
        <hr />
        <br />
        <button (click)="onSwitchMode()" type="button">
          Switch to {{ isLoginMode ? 'Sign Up' : 'Login' }}
        </button>
      </form>
      <hr />
      <button (click)="onLogout()">Logout</button>
    </div>
  `,
  styles: [
    `
      .auth-wrapper {
        width: 100%;
        min-height: 100vh;
        display: grid;
        place-content: center;
        gap: 2rem;
      }
    `,
  ],
})
export class AuthComponent {
  authForm!: FormGroup;
  isLoginMode = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogout() {
    this.authService.logout();
  }

  onSubmit() {
    if (this.authForm.valid) {
      const email = this.authForm.get('email')?.value;
      const password = this.authForm.get('password')?.value;

      if (this.isLoginMode) {
        this.login(email, password);
      } else {
        this.register(email, password);
      }
    }
  }

  login(email: string, password: string) {
    this.authService.loginWithEmailAndPassword(email, password).subscribe(
      (user) => {
        if (user.role === 'admin') {
          this.router.navigate(['dashboard'], { relativeTo: this.route });
        } else {
          // Navigate to a regular user page or show a message
        }
      },
      (error) => console.error('Login error:', error)
    );
  }

  register(email: string, password: string) {
    this.authService.registerWithEmailAndPassword(email, password).subscribe(
      (user) => {
        console.log('Registered user:', user);
        // if i want to log in automatically, but i dont
        // this.login(email, password);
      },
      (error) => console.error('Registration error:', error)
    );
  }
}
