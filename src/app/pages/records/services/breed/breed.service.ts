import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { breed } from '../../shared/model/models ';


@Injectable({
  providedIn: 'root'
})
export class BreedService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'api/breeds' ;

  breeds=[
    'Fresian',
    'Ayrshire',
    'Guernsy',
    'Simmental/Flecvieh',
    'Boran',
    'sahiwal',
    'East African Zebu'
  ]

  // Find all available breeds
  getAllBreeds(): Observable<any> {
    return this.http.get<breed>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  

}
