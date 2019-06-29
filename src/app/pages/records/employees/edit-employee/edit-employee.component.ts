



import { Component, AfterViewInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import { EmployeeModel } from '../employee.model';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { Employee } from '../../shared/model/models ';
import { EmployeeService } from '../../services/employee.service';
import { UpdateDatatableService } from '../../services/services/update-datatable.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';






@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  encapsulation: ViewEncapsulation.None
})


export class EditEmployeeComponent implements AfterViewInit {



  private recordId: number;
  private idColumn;
  private paginator;
  private dataSource;


  // This is a form group from FormBuilder.
  @ViewChild(AddEditFormComponent)  private addEditForm: AddEditFormComponent;



  constructor(
    private httpService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Used in modal for close()
    public dialogRef: MatDialogRef<EditEmployeeComponent>,        
    private updateDatatableService: UpdateDatatableService,
    private messagesService: MessagesService
  ) {}
  



  // ---- GET DATA BY ID ----
  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchRecord();
    }, 200);
  }

  public fetchRecord() {

    this.recordId = this.data.recordId;
    this.idColumn = this.data.idColumn;
    this.paginator = this.data.paginator;
    this.dataSource = this.data.dataSource;

    // Display the data retrieved from the data model to the form model.
    this.httpService.getEmployee(this.recordId)
        .subscribe(data => {
            this.fillForm(data);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            this.handleError(err);
          });
  }

  // Populate the form, called above in fetchRecord().
  private fillForm(parsedData) {
    this.addEditForm.addEditEmployeeForm.setValue({
      employeeId: parsedData.employeeId,
      name: parsedData.name,
      email: parsedData.email,
      phoneNumber: parsedData.phoneNumber,
      dateOfEmployment: parsedData.dateOfEmployment,
     
    });
 
  }



// ---- UPDATE ----  

  public update(formValue) {
    if (this.addEditForm.addEditEmployeeForm.valid) {
      this.httpService.updateEmployee(this.recordId, formValue)
      .subscribe(
        result => {
          // Update the table data view for the changes.
          this.updateDatatableService.updateDataTable(
            result, this.recordId, this.idColumn, this.paginator, this.dataSource, formValue);
          this.success();
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.handleError(err);
        }
      );
    }
  }

  

  // ---- UTILITIES ----


  private reset() {
    this.addEditForm.addEditEmployeeForm.reset();
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error em1', 'Please check your Internet connection.');
  }
}



