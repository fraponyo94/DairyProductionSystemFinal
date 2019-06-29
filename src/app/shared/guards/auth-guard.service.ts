import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/pages/login/auth/auth-services/auth.service';
import { TokenStorageService } from 'src/app/pages/login/auth/auth-services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor(private router: Router,private authService: AuthService,private tokenStorage: TokenStorageService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.authorities) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/dairy/login']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
    this.router.navigate(['/dairy/login']);// { queryParams: { returnUrl: state.url } });
    return false;
    }

  }
 

