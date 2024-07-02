import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { Services } from '../models/services';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = "https://localhost:7062/api/Service/";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Services[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => response.data) 
    );
  }
  getserviceById(id: number): Observable<Services> {
    return this.http.get<Services>(`${this.baseUrl}${id}`);
  }
  add(serv: Services): Observable<Services> {
    return this.http.post<Services>(this.baseUrl, serv);
  }
  uploadImage(formData: FormData): Observable<string> {
    const uploadUrl = `${this.baseUrl}upload`;
    return this.http.post<string>(uploadUrl, formData);
  }

  update(serv:  Services): Observable<Services> {
    return this.http.put<Services>(`${this.baseUrl}${serv.id}`, serv);
  }
  deleteService(serviceId: number): Observable<void> {
    const url = `${this.baseUrl}${serviceId}`;
    return this.http.delete<void>(url);
  }
}
