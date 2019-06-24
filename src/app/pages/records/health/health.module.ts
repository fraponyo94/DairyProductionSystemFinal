import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  routing } from './health-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HealthComponent } from './health.component';
import { CattleHealthComponent } from './cattle-health/cattle-health.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CalfHealthComponent } from './calf-health/calf-health.component';

@NgModule({
  declarations: [HealthComponent,CattleHealthComponent,CalfHealthComponent],
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
export class HealthModule { }
