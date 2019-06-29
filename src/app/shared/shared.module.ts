import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* components */
import { CardComponent } from './components/card/card.component';

import { ProfileComponent } from './components/profile/profile.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PdfServiceService } from '../pages/records/services/pdf-service.service';

@NgModule({
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,      
    FlexLayoutModule,
    MDBBootstrapModule.forRoot() 
 
  ],
  declarations: [
    CardComponent,
  
    ProfileComponent
  ],
  providers: [
    PdfServiceService
  ],
  exports: [
    CardComponent,      
    ProfileComponent,
    
  ]
})
export class SharedModule { }
