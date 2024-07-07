import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Serviceprovider } from '../models/serviceprovider';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderServiceService{
   private baseUrl: string = 'https://localhost:7062/api/ServiceProvider/';

constructor(private http: HttpClient,private authService:AuthServiceService) {}

// getAll(): Observable<Serviceprovider[]> {
//   return this.http.get<Serviceprovider[]>(this.baseUrl);
// }

// add(serviceProvider: Serviceprovider): Observable<Serviceprovider> {
//   return this.http.post<Serviceprovider>(this.baseUrl, serviceProvider);
// }



// uploadImage(formData: FormData): Observable<string> {
//   const uploadUrl = `${this.baseUrl}upload`;
//   return this.http.post<string>(uploadUrl, formData);
// }
// getServiceProviderById(id: number): Observable<Serviceprovider> {
//   return this.http.get<Serviceprovider>(`${this.baseUrl}${id}`);
// }
// update(serviceProvider: Serviceprovider): Observable<Serviceprovider> {
//   return this.http.put<Serviceprovider>(`${this.baseUrl}${serviceProvider.id}`, serviceProvider);
// }

// deleteServiceProvider(serviceProviderId: number): Observable<void> {
//   const url = `${this.baseUrl}${serviceProviderId}`;
//   return this.http.delete<void>(url);
// }

// }
private getHeaders(): HttpHeaders {
  const token = this.authService.getToken();
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
}

getAll(): Observable<Serviceprovider[]> {
  const headers = this.getHeaders();
  return this.http.get<Serviceprovider[]>(this.baseUrl, { headers });
}

add(serviceProvider: Serviceprovider): Observable<Serviceprovider> {
  const headers = this.getHeaders();
  return this.http.post<Serviceprovider>(this.baseUrl, serviceProvider, { headers });
}

uploadImage(formData: FormData): Observable<string> {
  const uploadUrl = `${this.baseUrl}upload`;
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.post<string>(uploadUrl, formData, { headers });
}

getServiceProviderById(id: number): Observable<Serviceprovider> {
  const headers = this.getHeaders();
  return this.http.get<Serviceprovider>(`${this.baseUrl}${id}`, { headers });
}

update(serviceProvider: Serviceprovider): Observable<Serviceprovider> {
  const headers = this.getHeaders();
  return this.http.put<Serviceprovider>(`${this.baseUrl}${serviceProvider.id}`, serviceProvider, { headers });
}

deleteServiceProvider(serviceProviderId: number): Observable<void> {
  const headers = this.getHeaders();
  const url = `${this.baseUrl}${serviceProviderId}`;
  return this.http.delete<void>(url, { headers });
}
}
