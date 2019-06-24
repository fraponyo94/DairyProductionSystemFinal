import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './mortality-routing.module';
import { MortalityComponent } from './mortality.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [MortalityComponent],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,   
    FlexLayoutModule,
    MDBBootstrapModule.forRoot() 
  ]
})
export class MortalityModule { }
