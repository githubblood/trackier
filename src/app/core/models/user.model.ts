// User Roles
export type UserRole = 'admin' | 'publisher' | 'advertiser';

// User Model
export interface User {
    id: number;
    uid: string;
    email: string;
    name: string;
    role: UserRole;
}

// Login Request
export interface LoginRequest {
    email: string;
    password: string;
}

// Login Response
export interface LoginResponse {
    success: boolean;
    data: {
        user: User;
        token: string;
    };
}

// Init Response
export interface InitResponse {
    success: boolean;
    data: {
        initialized: boolean;
        device: boolean;
    };
}

// Generic API Response
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
