import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Serviceprovider } from '../models/serviceprovider';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderServiceService{
   private baseUrl: string = 'https://localhost:7062/api/ServiceProvider/';

constructor(private http: HttpClient) {}

getAll(): Observable<Serviceprovider[]> {
  return this.http.get<Serviceprovider[]>(this.baseUrl);
}

add(serviceProvider: Serviceprovider): Observable<Serviceprovider> {
  return this.http.post<Serviceprovider>(this.baseUrl, serviceProvider);
}



uploadImage(formData: FormData): Observable<string> {
  const uploadUrl = `${this.baseUrl}upload`;
  return this.http.post<string>(uploadUrl, formData);
}
getServiceProviderById(id: number): Observable<Serviceprovider> {
  return this.http.get<Serviceprovider>(`${this.baseUrl}${id}`);
}
update(serviceProvider: Serviceprovider): Observable<Serviceprovider> {
  return this.http.put<Serviceprovider>(`${this.baseUrl}${serviceProvider.id}`, serviceProvider);
}

deleteServiceProvider(serviceProviderId: number): Observable<void> {
  const url = `${this.baseUrl}${serviceProviderId}`;
  return this.http.delete<void>(url);
}

}
