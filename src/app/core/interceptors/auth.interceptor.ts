import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const storageService = inject(StorageService);
    const token = storageService.getToken();

    // Skip adding token for login and init endpoints
    const skipUrls = ['/auth/login', '/auth/register', '/init'];
    const shouldSkip = skipUrls.some(url => req.url.includes(url));

    if (token && !shouldSkip) {
        const clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedReq);
    }

    return next(req);
};
