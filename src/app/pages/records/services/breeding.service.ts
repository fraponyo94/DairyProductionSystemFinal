import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { breeding } from '../shared/model/models ';

@Injectable({
  providedIn: 'root'
})
export class BreedingService {
  
  
  constructor(private http: HttpClient) { }
  private baseUrl = 'api/breedings' ;

   // Add Breeding
   addBreeding( breeding: object ): Observable<object> {

    return this.http.post(`${this.baseUrl}`, breeding);
  }


  // Find all breeding Records
  getAllBreedingRecords( ): Observable<any> {
    return this.http.get<breeding>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

}







