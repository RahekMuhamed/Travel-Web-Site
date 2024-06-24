import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = "https://localhost:7062/api/Service/";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Services[]> {
    return this.http.get<Services[]>(this.baseUrl);
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
}
