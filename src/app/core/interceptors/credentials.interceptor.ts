import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    // Clone the request and set withCredentials to true
    const clonedReq = req.clone({
        withCredentials: true
    });
    return next(clonedReq);
};
