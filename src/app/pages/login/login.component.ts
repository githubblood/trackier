import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  isLoading = false;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Get return URL from route parameters or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    // If already logged in, redirect to dashboard
    if (this.authService.isLoggedIn()) {
      this.authService.redirectToDashboard();
    }
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success && response.data) {
          const role = response.data.user.role;
          console.log('Login successful. Role:', role);

          // Role-based redirect
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // Redirect based on role
            switch (role) {
              case 'admin':
                this.router.navigate(['/dashboard']);
                break;
              case 'publisher':
                this.router.navigate(['/publisher/dashboard']);
                break;
              case 'advertiser':
                this.router.navigate(['/advertiser/dashboard']);
                break;
              default:
                this.router.navigate(['/dashboard']);
            }
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);

        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server';
        } else {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      }
    });
  }

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
