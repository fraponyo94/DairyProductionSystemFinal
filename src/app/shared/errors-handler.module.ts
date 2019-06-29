import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
// import { GlobalErrorHandler } from './Errors/global-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ServerErrorInterceptor } from './Errors/server-error.interceptor';
import { MessagesComponent } from '../pages/records/services/services/messages-service/messages.component';
import { ErrorInterceptor } from './Errors/error-interceptor';
import { AuthInterceptor } from '../pages/login/auth/auth-interceptor';

@NgModule({
  declarations: [ MessagesComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [MatSnackBarModule, MessagesComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],  
    entryComponents:[
        MessagesComponent
    ] 
})
export class ErrorsHandlerModule { }
