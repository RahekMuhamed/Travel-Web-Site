
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'https://localhost:7062/api/User';
  public clientData = { Passport: "", PhoneNumber: '', ResidanceCountry: '' };

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

private getHttpOptions() {
  const token = this.authService.getToken();
  if (token) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      })
    };
  }
  return {}; // Handle case where token is not available
}


  // Get user by ID
  getUserData(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Update user (both admins and clients)
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.id}`, user, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user by ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Get all clients
  getAllClients(): Observable<User[]> {
    return this.http.get<any>(`${this.apiUrl}/clients`, this.getHttpOptions()).pipe(
      map(data => this.extractClientData(data)),
      catchError(this.handleError)
    );
  }

  // Update user data
  updateUserData(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/completeInfo/${id}`, this.clientData, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Get all admins
  getAllAdmins(): Observable<User[]> {
    return this.http.get<any>(`${this.apiUrl}/admins`, this.getHttpOptions()).pipe(
      map(data => this.extractAdminData(data)),
      catchError(this.handleError)
    );
  }

  // Extract client data
  private extractClientData(data: any): User[] {
    console.log('Raw Clients Data:', data);
    if (data && data.$values && data.$values.length > 0) {
      return data.$values.map((clientData: any) => ({
        id: clientData.id,
        fname: clientData.fname || '',
        email: clientData.email || '',
        gender: clientData.gender || '',
        roles: clientData.roles || [],
      }));
    } else {
      console.log('No clients found in data.');
      return [];
    }
  }

  // Extract admin data
  private extractAdminData(data: any): User[] {
    console.log('Raw Admin Data:', data);
    if (data && data.$values && data.$values.length > 0) {
      return data.$values.map((adminData: any) => ({
        id: adminData.id,
        fname: adminData.fname || '',
        email: adminData.email || '',
        gender: adminData.gender || '',
        roles: adminData.roles || [],
      }));
    } else {
      console.log('No admins found in data.');
      return [];
    }
  }

  // Handle error
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.error && error.error.message) {
      // Server-side error with a message
      errorMessage = error.error.message;
    } else if (error.message) {
      // Server-side error without a specific message
      errorMessage = error.message;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(errorMessage);
  }
}




























// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { User } from '../models/user';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import { AuthServiceService } from './auth-service.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class UserServiceService {

//   private apiUrl = 'http://localhost:5141/api/User';
//    public clientData = {Passport:"",PhoneNumber:'',ResidanceCountry:''}

//   constructor(private http: HttpClient, private authService: AuthServiceService) {}
//   private getHttpOptions() {
//     const token = this.authService.getToken();
//     return {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'Cache-Control': 'no-cache',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       })
//     };
//   }


//   // Get user by ID
//   getUserData(userId: string): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/${userId}`, this.getHttpOptions()).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Update user (both admins and clients)
//   updateUser(user: User): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${user.id}`, user, this.getHttpOptions()).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Delete user by ID
//   deleteUser(userId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${userId}`, this.getHttpOptions()).pipe(
//       catchError(this.handleError)
//     );
//   }


//     // Get all clients
//     getAllClients(): Observable<User[]> {
//       return this.http.get<any>(`${this.apiUrl}/clients`, this.getHttpOptions()).pipe(
//         map(data => this.extractClientData(data)),
//         catchError(this.handleError)
//       );
//   }
//   //update user Data
//   updateUserData(id:string,):Observable<any>// client id
//   {
//     return this.http.put<any>(`${this.apiUrl}/completeInfo/${id}`, this.clientData, this.getHttpOptions()).pipe(
//       map(response => response)     
//     );
//   }

//     private extractClientData(data: any): User[] {
//       console.log('Raw Clients Data:', data);
//       if (data && data.$values && data.$values.length > 0) {
//         return data.$values.map((clientData: any) => ({
//           id: clientData.id,
//           fname: clientData.fname || '',
//           email: clientData.email || '',
//           gender: clientData.gender || '',
//           roles: clientData.roles || [],
//         }));
//       } else {
//         console.log('No clients found in data.');
//         return [];
//       }
//     }

//     // Get all admins
//     getAllAdmins(): Observable<User[]> {
//       const headers = this.getHttpOptions().headers;
    
//       return this.http.get<any>(`${this.apiUrl}/admins`, { headers }).pipe(
//         map(data => this.extractAdminData(data)),
//         catchError(this.handleError)
//       );
//     }
    
  

//     private extractAdminData(data: any): User[] {
//       console.log('Raw Admin Data:', data);
//       if (data && data.$values && data.$values.length > 0) {
//         return data.$values.map((adminData: any) => ({
//           id: adminData.id,
//           fname: adminData.fname || '',
//           email: adminData.email || '',
//           gender: adminData.gender || '',
//           roles: adminData.roles || [],
//         }));
//       } else {
//         console.log('No admins found in data.');
//         return [];
//       }
//     }
//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Something went wrong; please try again later.';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = error.error.message;
//     } else if (error.error && error.error.message) {
//       // Server-side error with a message
//       errorMessage = error.error.message;
//     } else if (error.message) {
//       // Server-side error without a specific message
//       errorMessage = error.message;
//     }
//     console.error('An error occurred:', errorMessage);
//     return throwError(errorMessage);
//   }
// }
// function parseJwt(token: string) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }




