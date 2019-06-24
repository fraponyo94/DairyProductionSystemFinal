
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef} from '@angular/material';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { EmployeeService } from '../../services/employee.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { FormErrorsService } from '../../services/services/form-validation/form-errors.service';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  encapsulation: ViewEncapsulation.None
})


export class AddEmployeeComponent {

  @ViewChild(AddEditFormComponent)
  public addEmployeeForm: AddEditFormComponent;



  constructor(
    private httpService: EmployeeService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,  // Used by the html component.
    private messagesService: MessagesService,
    public formErrorsService: FormErrorsService
  ) { }


  reset() {
    this.addEmployeeForm.addEditEmployeeForm.createForm();
    this.addEmployeeForm.addEditEmployeeForm.reset();
  }

  //  Processes form data and sends it to the server and db.

  public save(addEmployeeForm) {
    if (this.addEmployeeForm.addEditEmployeeForm.valid) {

    const enteredData = this.addEmployeeForm.addEditEmployeeForm.value;

    this.httpService.createEmployee(enteredData)
      .subscribe(
        res => {
          this.success();
          this.reset(); 
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.handleError(err);
          return this.addEmployeeForm.addEditEmployeeForm;
        }
      );
    } else {
      this.addEmployeeForm.formErrors = this.formErrorsService.validateForm(
        this.addEmployeeForm.addEditEmployeeForm,
        this.addEmployeeForm.formErrors, false
      );
    }
    
    
  }

  

  private success() {
    this.messagesService.openDialog('Success', ' Saved successfully!');
  }

  private handleError(error) {
    this.messagesService.openDialog('','Error saving,Could not be saved successfully.Please recheck your inputs before resubmiting.');
  }

}


