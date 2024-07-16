import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,throwError} from 'rxjs';
import { Services } from '../models/services';
import { catchError, map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  //loading$: any;
    loading$ = new BehaviorSubject<boolean>(false); // Initialized as a BehaviorSubject

  getServicesByCategory(categoryId: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = 'http://localhost:5141/api/Service/';

  constructor(private http: HttpClient,private authService:AuthServiceService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllpag(page?: number, pageSize?: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      `${this.baseUrl}?pageNumber=${page}&pageSize=${pageSize}`, { headers }
    ).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
    // New method to fetch all hotel services
 getAllHotels(page?: number, pageSize?: number): Observable<any> {
  let url = `${this.baseUrl}HotelServices`;
  if (page !== undefined && pageSize !== undefined) {
    url += `?pageNumber=${page}&pageSize=${pageSize}`;
  }
  return this.http.get<any>(url).pipe(
    map((response) => response),
    catchError(this.handleError)
  );
}


  getAll(): Observable<Services[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.baseUrl, { headers }).pipe(
      map(response => response.data)
    );
  }

  getserviceById(id: number): Observable<Services> {
    const headers = this.getHeaders();
    return this.http.get<Services>(`${this.baseUrl}${id}`, { headers });
  }

  add(serv: Services): Observable<Services> {
    const headers = this.getHeaders();
    return this.http.post<Services>(this.baseUrl, serv, { headers });
  }

  uploadImage(formData: FormData): Observable<string> {
    const uploadUrl = `${this.baseUrl}upload`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<string>(uploadUrl, formData, { headers });
  }

  update(serv: Services): Observable<Services> {
    const headers = this.getHeaders();
    return this.http.put<Services>(`${this.baseUrl}${serv.id}`, serv, { headers });
  }

  deleteService(serviceId: number): Observable<void> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${serviceId}`;
    return this.http.delete<void>(url, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
