import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = "https://localhost:44331/api/Service/";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Services[]> {
    return this.http.get<Services[]>(this.baseUrl);
  }
}
