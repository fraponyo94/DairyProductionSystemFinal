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
import { UpdateMilkingRecordsComponent } from './update-milking-records/update-milking-records.component';
import { UpdateDatatableService } from '../services/services/update-datatable.service';

@NgModule({
  declarations: [ 
    MilkingComponent,
    MilkRecordsComponent,
    MilkComponent,
    UpdateMilkingRecordsComponent],

  imports: [
    CommonModule, 
    routing,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,   
    FlexLayoutModule,
    MDBBootstrapModule.forRoot() 
  ],
  providers: [UpdateDatatableService],
  
  entryComponents: [
    UpdateMilkingRecordsComponent
  ],
})
export class MilkingModule { }
