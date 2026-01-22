import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User, UserRole, LoginRequest, LoginResponse, InitResponse } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = environment.apiUrl;

    // Current user state
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    // App initialized state
    private initializedSubject = new BehaviorSubject<boolean>(false);
    public initialized$ = this.initializedSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        private storageService: StorageService
    ) {
        // Load user from storage on app start
        const savedUser = this.storageService.getUser();
        if (savedUser) {
            this.currentUserSubject.next(savedUser);
        }
    }

    // Initialize Device (First Call)
    initDevice(): Observable<InitResponse> {
        return this.http.post<InitResponse>(`${this.baseUrl}/init`, {}, {
            withCredentials: true
        }).pipe(
            tap(response => {
                if (response.success) {
                    this.initializedSubject.next(true);
                    this.storageService.setDeviceInitialized(true);
                }
            }),
            catchError(error => {
                console.error('Device init failed:', error);
                return throwError(() => error);
            })
        );
    }

    // Ensure device is initialized (call before API requests if needed)
    ensureDeviceInitialized(): Observable<boolean> {
        if (this.storageService.isDeviceInitialized()) {
            return new Observable(subscriber => {
                subscriber.next(true);
                subscriber.complete();
            });
        }
        return this.initDevice().pipe(
            map(response => response.success),
            catchError(err => {
                console.warn('Device re-initialization failed:', err);
                return new Observable<boolean>(sub => { sub.next(false); sub.complete(); });
            })
        );
    }

    // Login
    login(email: string, password: string): Observable<LoginResponse> {
        const body: LoginRequest = { email, password };

        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body, {
            withCredentials: true
        }).pipe(
            tap(response => {
                if (response.success && response.data) {
                    // Save token and user
                    this.storageService.saveToken(response.data.token);
                    this.storageService.saveUser(response.data.user);
                    this.currentUserSubject.next(response.data.user);
                }
            }),
            catchError(error => {
                console.error('Login failed:', error);
                return throwError(() => error);
            })
        );
    }

    // Logout
    logout(): void {
        this.storageService.clearAll();
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    // Get current user
    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    // Get current token
    get token(): string | null {
        return this.storageService.getToken();
    }

    // Check if user is logged in
    isLoggedIn(): boolean {
        return this.storageService.isLoggedIn();
    }

    // Get user role
    getUserRole(): UserRole | null {
        const user = this.currentUser;
        return user ? user.role : null;
    }

    // Check if user has specific role
    hasRole(role: UserRole): boolean {
        return this.getUserRole() === role;
    }

    // Check if user has any of the specified roles
    hasAnyRole(roles: UserRole[]): boolean {
        const userRole = this.getUserRole();
        return userRole ? roles.includes(userRole) : false;
    }

    // Get dashboard route based on role
    getDashboardRoute(): string {
        const role = this.getUserRole();
        switch (role) {
            case 'admin':
                return '/dashboard'; // Admin uses main dashboard
            case 'publisher':
                return '/publisher/dashboard';
            case 'advertiser':
                return '/advertiser/dashboard';
            default:
                return '/login';
        }
    }

    // Redirect to appropriate dashboard
    redirectToDashboard(): void {
        const route = this.getDashboardRoute();
        this.router.navigate([route]);
    }
}
