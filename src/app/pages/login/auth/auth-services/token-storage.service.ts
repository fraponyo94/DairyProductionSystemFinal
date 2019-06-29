import { Injectable } from '@angular/core';
import { JwtResponse } from '../jwt-response';

const TOKEN_KEY = 'Bearer';
const USERNAME_KEY = 'username';
const AUTHORITIES_KEY = 'authorities';
const NAME ='name';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public saveName(name: string){
    window.sessionStorage.removeItem(NAME);
    window.sessionStorage.setItem(NAME,name);
  }

  public getName(): string {
    return sessionStorage.getItem(NAME);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  // save current user
  public currentUser(json: any){
      window.sessionStorage.removeItem('currentUser');
      window.sessionStorage.setItem('currentUser', json);
  }

  // Get current user
   // save current user
   public get getcurrentUser(){
     return sessionStorage.getItem('currentUser');
}
}
