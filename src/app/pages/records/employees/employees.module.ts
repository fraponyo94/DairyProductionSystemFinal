import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UpdateDatatableService } from '../services/services/update-datatable.service';
import { EmployeeService } from '../services/employee.service';
import { ConfirmService } from '../services/services/confirm-dialog/confirm.service';
import { MessagesService } from '../services/services/messages-service/messages.service';
import { FormErrorsService } from '../services/services/form-validation/form-errors.service';
import { ConfirmComponent } from '../services/services/confirm-dialog/confirm.component';

@NgModule({
  declarations: [ 
    EmployeesComponent,
    EditEmployeeComponent,
    AddEditFormComponent,
    ConfirmComponent,
    AddEmployeeComponent],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,   
    FlexLayoutModule,
    MDBBootstrapModule.forRoot() 
  ],
  providers: [
    UpdateDatatableService,
    EmployeeService,
    ConfirmService,
    MessagesService,
    FormErrorsService,
  ],
  entryComponents: [
    ConfirmComponent,
   
    EditEmployeeComponent,
    AddEmployeeComponent
  ],
})
export class EmployeesModule { }
