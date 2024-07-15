
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DecodedToken } from '../models/decoded-token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://localhost:7062/api/Account';

  constructor(private http: HttpClient, private router: Router) {}

  // Register a new user
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data)
      .pipe(catchError(this.handleError));
  }

  // Log in a user
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

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Log out a user
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

    return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions).pipe(
      catchError(error => {
        console.error('Logout error:', error);
        return throwError(error);
      }),
      tap(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        console.log('LocalStorage items cleared after logout.');
        this.router.navigate(['/login']);
      })
    );
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Get the stored user role
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Decode the token to get user details
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

  // Get the user ID from the token
  getUserIdFromToken(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : null;
  }

  // Send a reset password email
  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forget-password`, { email })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Reset password
  resetPassword(data: { password: string; confirmPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Change password
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const data = { currentPassword, newPassword };
    return this.http.post<any>(`${this.apiUrl}/change-password`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Verify email
  verifyEmail(verificationCode: string): Observable<any> {
    const url = `${this.apiUrl}/email-confirmation`;
    return this.http.post<any>(url, { verificationCode }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}




























// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { DecodedToken } from '../models/decoded-token';
// import { jwtDecode } from 'jwt-decode';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthServiceService {
//   private apiUrl = 'http://localhost:5141/api/Account';

//   constructor(private http: HttpClient, private router: Router) {}

//   register(data: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, data)
//       .pipe(catchError(this.handleError));
//   }

//   login(loginData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, loginData)
//       .pipe(
//         tap(response => {
//           const token = response.token;
//           localStorage.setItem('authToken', token);
//           localStorage.setItem('userRole', response.role);

//           // Decode the token and store user ID
//           const decodedToken: any = jwtDecode(token);
//           console.log('Decoded Token:', decodedToken);

//           const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
//           console.log('User ID:', userId);
//           localStorage.setItem('userId', userId);
//         }),
//         catchError(this.handleError)
//       );
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('authToken');
//   }

//   logout(): Observable<any> {
//     const authToken = localStorage.getItem('authToken');
//     if (!authToken) {
//       console.error('No authToken found.');
//       return throwError('No authToken found.');
//     }

//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Authorization': `Bearer ${authToken}`
//       })
//     };

//     return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions).pipe(
//       catchError(error => {
//         console.error('Logout error:', error);
//         return throwError(error);
//       }),
//       tap(() => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('userId');
//         console.log('LocalStorage items cleared after logout.');
//         this.router.navigate(['/login']);
//       })
//     );

//   }

//   getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   getRole(): string | null {
//     return localStorage.getItem('userRole');
//   }

//   decodeToken(): DecodedToken | null {
//     const token = this.getToken();
//     if (token) {
//       try {
//         return jwtDecode<DecodedToken>(token);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         return null;
//       }
//     }
//     return null;
//   }

//   getUserIdFromToken(): string | null {
//     const decodedToken = this.decodeToken();
//     return decodedToken ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : null;
//   }

//   sendResetPasswordEmail(email: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/forget-password`, { email })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   resetPassword(data: { password: string; confirmPassword: string }): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/reset-password`, data)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   changePassword(currentPassword: string, newPassword: string): Observable<any> {
//     const token = this.getToken();
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       })
//     };
//     const data = { currentPassword, newPassword };
//     return this.http.post<any>(`${this.apiUrl}/change-password`, data, httpOptions)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }
//   verifyEmail(verificationCode: string): Observable<any> {
//     const url = `${this.apiUrl}/email-confirmation`;
//     return this.http.post<any>(url, { verificationCode }).pipe(
//       catchError(this.handleError)
//     );
//   }
  
//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred:', error);
//     return throwError(error);
//   }
// }
