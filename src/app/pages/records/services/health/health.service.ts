import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

 
  constructor(private http: HttpClient) { }
  private baseUrl = 'api/health' ;

   // Add Health Records
   addHealthRecords( health: object ): Observable<object> {
    return this.http.post(`${this.baseUrl}`, health);
  }

  
}
