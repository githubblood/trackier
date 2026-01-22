import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';
const USER_KEY = 'auth_user';
const DEVICE_INITIALIZED_KEY = 'device_initialized';

// Token expiry duration: 30 days in milliseconds
const TOKEN_EXPIRY_DAYS = 30;
const TOKEN_EXPIRY_MS = TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
        // Check token expiry on service initialization
        this.checkTokenExpiry();
    }

    // Token Management
    saveToken(token: string): void {
        const expiryTime = Date.now() + TOKEN_EXPIRY_MS;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    getToken(): string | null {
        // Check if token has expired
        if (this.isTokenExpired()) {
            this.clearAll();
            return null;
        }
        return localStorage.getItem(TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
    }

    // Check if token has expired
    private isTokenExpired(): boolean {
        const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
        if (!expiryTime) {
            return true; // No expiry set, consider expired
        }
        return Date.now() > parseInt(expiryTime, 10);
    }

    // Check and clear expired token on app start
    private checkTokenExpiry(): void {
        if (this.isTokenExpired()) {
            this.clearAll();
        }
    }

    // Device Initialization Management
    setDeviceInitialized(value: boolean): void {
        if (value) {
            sessionStorage.setItem(DEVICE_INITIALIZED_KEY, 'true');
        } else {
            sessionStorage.removeItem(DEVICE_INITIALIZED_KEY);
        }
    }

    isDeviceInitialized(): boolean {
        return sessionStorage.getItem(DEVICE_INITIALIZED_KEY) === 'true';
    }

    // User Management
    saveUser(user: User): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): User | null {
        // Also check token expiry when getting user
        if (this.isTokenExpired()) {
            this.clearAll();
            return null;
        }
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    removeUser(): void {
        localStorage.removeItem(USER_KEY);
    }

    // Clear All Auth Data
    clearAll(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        localStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(DEVICE_INITIALIZED_KEY);
    }

    // Check if user is logged in (and token not expired)
    isLoggedIn(): boolean {
        return !!this.getToken(); // getToken() already checks expiry
    }
}
