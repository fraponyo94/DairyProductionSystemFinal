import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedingComponent } from './add-breeding/breeding.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { routing } from './breeding-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BreedingRecordsComponent } from './breeding-records/breeding-records.component';
import { MainBreedingComponent } from './main-breeding/main-breeding.component';

@NgModule({
  declarations: [BreedingComponent, BreedingRecordsComponent, MainBreedingComponent],
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
export class BreedingModule { }
