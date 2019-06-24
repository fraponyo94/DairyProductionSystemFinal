import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/pages/login/auth/auth-services/token-storage.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

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

        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event', event);
              }
            return event;
        }),

        retry(1),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
              message: error.message

          };
          if (error.status === 401) {
            // refresh token
          } else {
            return throwError(error);
          }
        })
      );
  }
}