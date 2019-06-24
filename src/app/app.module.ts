import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmService } from './pages/records/services/services/confirm-dialog/confirm.service';
import { MessagesService } from './pages/records/services/services/messages-service/messages.service';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './shared/material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

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
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
        // ,
        HttpClient,
        // UpdateDatatableService,
        // EmployeeService,
         ConfirmService,
        MessagesService,
        // FormErrorsService,
        // AuthService,
        DatePipe
    
    ],
    entryComponents: [
       
    ],
})
export class AppModule { }
