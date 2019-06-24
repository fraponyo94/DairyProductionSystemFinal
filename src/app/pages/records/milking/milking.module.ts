import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MilkingComponent } from './add-milk-records/milking.component';
import { MilkRecordsComponent } from './milk-records/milk-records.component';
import { MilkComponent } from './milk.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './milking-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ 
    MilkingComponent,
    MilkRecordsComponent,
    MilkComponent],

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
export class MilkingModule { }
