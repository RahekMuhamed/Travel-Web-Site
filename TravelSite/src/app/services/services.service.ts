import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { Services } from '../models/services';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseUrl: string = 'http://localhost:5141/api/Service/';

  constructor(private http: HttpClient) {}


  

  getAll(page?: number, pageSize?: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}?pageNumber=${page}&pageSize=${pageSize}`).pipe(
        map((response) => response),
             catchError(this.handleError
      )
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

  update(serv: Services): Observable<Services> {
    return this.http.put<Services>(`${this.baseUrl}${serv.id}`, serv);
  }
  deleteService(serviceId: number): Observable<void> {
    const url = `${this.baseUrl}${serviceId}`;
    return this.http.delete<void>(url);
  }
}
