import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { health } from '../../shared/model/models ';

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

 // Find health records
  getAllRecords(): Observable<any> {
    return this.http.get<health>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  
}
