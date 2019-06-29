import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmService } from './pages/records/services/services/confirm-dialog/confirm.service';
import { MessagesService } from './pages/records/services/services/messages-service/messages.service';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './shared/material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthInterceptor } from './pages/login/auth/auth-interceptor';
import { ErrorInterceptor } from './shared/Errors/error-interceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    // FlexLayoutModule,
    MDBBootstrapModule.forRoot() ,
    routing
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],      
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [    
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        HttpClient,
      
         ConfirmService,
        MessagesService,
        
        DatePipe
    
    ],
    entryComponents: [
       
    ],
})
export class AppModule { }
