import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-publisher-signup',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './publisher-signup.component.html',
    styleUrl: './publisher-signup.component.scss'
})
export class PublisherSignupComponent {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    acceptTerms = false;

    constructor(private router: Router) { }

    register() {
        if (this.acceptTerms) {
            console.log('Publisher registration:', {
                firstName: this.firstName,
                lastName: this.lastName,
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
