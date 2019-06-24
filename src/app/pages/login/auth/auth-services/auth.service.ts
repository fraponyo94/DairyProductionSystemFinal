import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { JwtResponse } from '../jwt-response';
import { LoginDetails } from '../login-details';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private loginUrl = 'api/auth/token' ; 


  constructor(private http: HttpClient) {   
  }

  attemptAuth(credentials: LoginDetails): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

 
}
