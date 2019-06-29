import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mortality } from '../shared/model/models ';

@Injectable({
  providedIn: 'root'
})
export class MortalityService {
  

  constructor(private http: HttpClient) { }
  private baseUrl = 'api/mortality' ;

   // Add Mortality Records
   addMortalityRecords( mortality: object ): Observable<object> {
    return this.http.post(`${this.baseUrl}`, mortality);
  }

  // Find all
  getAllRecords(): Observable<any> {
    return this.http.get<mortality>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }
  
}
