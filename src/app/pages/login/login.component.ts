import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth-services/auth.service';
import { TokenStorageService } from './auth/auth-services/token-storage.service';
import { LoginDetails } from './auth/login-details';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
             './login.component.css'

             ]
})
export class LoginComponent implements OnInit {

        navbar: Boolean = false;

        form: any = {};
        isLoggedIn = false;
        isLoginFailed = false;
        roles: string[] = [];
        private loginInfo: LoginDetails;


        constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }


        // initialise parameters
          ngOnInit() {
            if (this.tokenStorage.getToken()) {
              this.navbar = true;
              this.isLoggedIn = true;
              this.roles = this.tokenStorage.getAuthorities();
            }
          }


          // Process login
        onSubmit() {

          this.loginInfo = new LoginDetails(
            this.form.username,
            this.form.password);

          this.authService.attemptAuth(this.loginInfo).subscribe(

            data => {
              this.tokenStorage.saveToken(data.accessToken);
              this.tokenStorage.saveUsername(data.username);
              this.tokenStorage.saveName(data.name);
              this.tokenStorage.saveAuthorities(data.authorities);

              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.tokenStorage.getAuthorities();
              this.router.navigate(['/dairy/home']);

            },
            error => {
              console.log(error);
              this.isLoginFailed = true;
            }
          );
        }



}
