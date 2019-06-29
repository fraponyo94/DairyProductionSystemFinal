import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


import { JwtResponse } from '../jwt-response';
import { LoginDetails } from '../login-details';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService { 
    private currentUserSubject: BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;

  private loginUrl = 'api/auth/token' ; 


  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();  
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
}


  attemptAuth(credentials: LoginDetails) {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('username',JSON.stringify(user.username));
            this.currentUserSubject.next(user);
        }

        return user;
    }));

    }
  


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }
 
}
