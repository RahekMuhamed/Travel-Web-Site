import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/decoded-token';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5141/api/Account';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data)
      .pipe(catchError(this.handleError));
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          const token = response.token;
          localStorage.setItem('authToken', token);
          localStorage.setItem('userRole', response.role);

          // Decode the token and store user ID
          const decodedToken: any = jwtDecode(token);
          console.log('Decoded Token:', decodedToken);

          const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          console.log('User ID:', userId);
          localStorage.setItem('userId', userId);
        }),
        catchError(this.handleError)
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('No authToken found.');
      return throwError('No authToken found.');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
    };

    return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions)
      .pipe(
        tap(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userId');
          console.log('LocalStorage items cleared after logout.');
          this.router.navigate(['/login']);
        }),
        catchError(this.handleError)
      );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<DecodedToken>(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getUserIdFromToken(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : null;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
