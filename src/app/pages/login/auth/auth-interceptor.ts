
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './auth-services/token-storage.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {    
    constructor(private token: TokenStorageService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = request;
        const tokens = this.token.getToken();
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
 
        if (tokens != null) {
            authReq = request.clone({ headers:  request.headers.set(TOKEN_HEADER_KEY, 'Bearer '+tokens) });
        }
        return next.handle(authReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event', event);
                   }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {                  
                    message: error.message
                    
                };
                console.log(data);
                return throwError(error);
            }));
    }
}
