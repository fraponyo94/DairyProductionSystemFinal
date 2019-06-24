import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  
}
