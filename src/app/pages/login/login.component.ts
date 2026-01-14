import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    if (this.email === 'Partners@spaxads.com' && this.password === 'Spaxads@#$11') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
