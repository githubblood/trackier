import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-advertiser-signup',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './advertiser-signup.component.html',
    styleUrl: './advertiser-signup.component.scss'
})
export class AdvertiserSignupComponent {
    fullName = '';
    email = '';
    password = '';
    acceptTerms = false;

    constructor(private router: Router) { }

    register() {
        if (this.acceptTerms) {
            console.log('Advertiser registration:', {
                fullName: this.fullName,
                email: this.email
            });
            // Navigate to login after registration
            this.router.navigate(['/login']);
        }
    }

    togglePassword(input: HTMLInputElement) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}
