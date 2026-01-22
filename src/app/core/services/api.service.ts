import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // GET Request
    get<T>(endpoint: string, options?: any): Observable<T> {
        return this.http.get(`${this.baseUrl}${endpoint}`, {
            withCredentials: true,
            ...options
        }) as Observable<T>;
    }

    // POST Request
    post<T>(endpoint: string, body: any, options?: any): Observable<T> {
        return this.http.post(`${this.baseUrl}${endpoint}`, body, {
            withCredentials: true,
            ...options
        }) as Observable<T>;
    }

    // PUT Request
    put<T>(endpoint: string, body: any, options?: any): Observable<T> {
        return this.http.put(`${this.baseUrl}${endpoint}`, body, {
            withCredentials: true,
            ...options
        }) as Observable<T>;
    }

    // DELETE Request
    delete<T>(endpoint: string, options?: any): Observable<T> {
        return this.http.delete(`${this.baseUrl}${endpoint}`, {
            withCredentials: true,
            ...options
        }) as Observable<T>;
    }

    // PATCH Request
    patch<T>(endpoint: string, body: any, options?: any): Observable<T> {
        return this.http.patch(`${this.baseUrl}${endpoint}`, body, {
            withCredentials: true,
            ...options
        }) as Observable<T>;
    }
}
