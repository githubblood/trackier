import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // First check if user is logged in
    if (!authService.isLoggedIn()) {
        router.navigate(['/login']);
        return false;
    }

    // Get required roles from route data
    const requiredRoles = route.data['roles'] as UserRole[];

    if (!requiredRoles || requiredRoles.length === 0) {
        return true; // No specific roles required
    }

    // Check if user has any of the required roles
    if (authService.hasAnyRole(requiredRoles)) {
        return true;
    }

    // User doesn't have required role - redirect to their dashboard
    console.warn('Access denied: User does not have required role');
    authService.redirectToDashboard();
    return false;
};
