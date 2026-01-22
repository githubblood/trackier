import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Prevents logged-in users from accessing login/signup pages
export const guestGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        return true; // Allow access to login/signup
    }

    // User is already logged in - redirect to their dashboard
    authService.redirectToDashboard();
    return false;
};
