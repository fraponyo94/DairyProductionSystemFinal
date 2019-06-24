import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'api/expenses' ;

   // Add Milking Records
   addExpensesRecords( expenses: object ): Observable<object> {
    return this.http.post(`${this.baseUrl}`, expenses);
  }


}
