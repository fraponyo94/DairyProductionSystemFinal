import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Employee } from '../shared/model/models ';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService { 

  private baseUrl = 'api/employees' ;

  constructor(private http: HttpClient) { }

  // Get employee by Id
  getEmployee(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  // Save employee
  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }


  // Update employee
  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }


   // Remove employee  records from database
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  // Get all employee Records
  getEmployeesRecords(): Observable<any> {
    return this.http.get<Employee>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  // --------- INCREMENTAL SEARCH --------

  //  Called by the Mat Datatable search by last name.

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
