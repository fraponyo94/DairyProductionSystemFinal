import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { calf } from '../shared/model/models ';


@Injectable({
  providedIn: 'root'
})
export class CalfService {
  
  

  constructor(private http: HttpClient) { }
  private baseUrl = 'api/calfs' ;


   // Get all Calf Records
   getAllCalfRecords(): Observable<any> {
    return this.http.get<calf>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  // Add Calf Records
  addCalf( calf : Object ): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, calf);
  }

  // Get calf records given Id
  getCalfRecordsByCowTag(recordId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${recordId}`);
  }


}
