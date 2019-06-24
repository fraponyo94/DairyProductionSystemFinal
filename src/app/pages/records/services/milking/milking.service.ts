import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { milkRecords } from '../../shared/model/models ';

@Injectable({
  providedIn: 'root'
})
export class MilkingService {


  constructor(private http: HttpClient) { }
  private baseUrl = 'api/milking' ;


   // Add Milking Records
   addMilkingRecords( milking: object ): Observable<object> {
    return this.http.post(`${this.baseUrl}`, milking);
  }


    // Get all Miking Records
    getMilkingRecords(): Observable<any> {
      return this.http.get<milkRecords>(`${this.baseUrl}`).pipe(
        catchError((error: any) => {
             console.error(error);
             return of();
           }),
      );
    }

  // Find Records given cowTag and date
  getRecordByCowwTagAndDate(cowTag: string, date: Date): Observable<any> {
      return this.http.get<milkRecords>(`${this.baseUrl}/${cowTag}/${date}`);

  }

    // --------- INCREMENTAL SEARCH --------
    //  Called by the Mat Datatable search .

    public nameSearch(terms) {
      return terms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(term => {
            const url = `api/members/?last_name=${term}`;
            return this.http.get(url);
        }),
        catchError((error: any) => {
             console.error(error);
             return of();
        }),
      );
    }
}
