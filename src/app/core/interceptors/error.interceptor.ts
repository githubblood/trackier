import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const router = inject(Router);
    const storageService = inject(StorageService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // Check for DEVICE_MISMATCH error in response body
            const errorBody = error.error;
            const isDeviceMismatch = errorBody?.error?.code === 'DEVICE_MISMATCH';

            if (isDeviceMismatch) {
                console.error('Device session mismatch - clearing session and redirecting to login');
                storageService.clearAll(); // This now also clears device_initialized
                router.navigate(['/login']);
                return throwError(() => error);
            }

            switch (error.status) {
                case 401:
                    // Unauthorized - Token expired or invalid
                    console.error('Unauthorized - Redirecting to login');
                    storageService.clearAll();
                    router.navigate(['/login']);
                    break;

                case 403:
                    // Forbidden - No permission
                    console.error('Forbidden - Access denied');
                    router.navigate(['/forbidden']);
                    break;

                case 404:
                    console.error('Resource not found');
                    break;

                case 500:
                    console.error('Server error');
                    break;

                default:
                    console.error('HTTP Error:', error.message);
            }

            return throwError(() => error);
        })
    );
};
