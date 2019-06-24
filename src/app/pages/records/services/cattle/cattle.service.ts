import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { cattle, CattleData } from '../../shared/model/models ';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CattleService {

 
  //  Base Url
  private baseUrl = 'api/cows' ;

  // To be shon on User form
  validationMessages: any;

  // Set up errors object
  formErrors = {
    cowTag: '',
    name: '',
    dateAcquired: '',
    breed: {
      name: '',
    }
  };

  // Min/maxlength validation
  textMin = 3;
  textMax = 15;

  constructor(private http: HttpClient) {
    this.validationMessages = {
      cowTag: {
        required: `Cow Tag is <strong>required</strong>.`,
        minlength: `Title must be ${this.textMin} characters or more.`

      },
      name: {
        required: `Cattle name is <strong>required</strong>.`,
        minlength: `Cattle name must be ${this.textMin} characters or more.`,
        maxlength: `Cattle name must not exceed  ${this.textMin} characters`


      },
       dateAcquired: {
        required: `dateAcquired is <strong>required</strong>.`,       
        date: `Acquired date must be a <strong>valid date</strong> should not be <strong>a future date</strong>.`
      }
      // name: {
      //   required: `Start time is <strong>required</strong>.`,
      //   pattern: `Start time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
      //   maxlength: `Start time must be ${this.timeMax} characters or less.`
      // }
    };
   }

  // Add cattle record

  addCattle( cattle: Object ): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, cattle);
  }


  // Update cattle record
  updateCattle(id: string, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  // Get cattle by Id
  getCattle(id: string): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

   // Remove cattle  records
  deleteCattleRecord(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  // Get all Cattle Records
  getAllCattleRecords(): Observable<any> {
    return this.http.get<CattleData>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }




}
