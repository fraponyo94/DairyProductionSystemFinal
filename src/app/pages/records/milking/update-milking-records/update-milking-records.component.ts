import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MilkingService } from '../../services/milking/milking.service';
import { UpdateDatatableService } from '../../services/services/update-datatable.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-milking-records',
  templateUrl: './update-milking-records.component.html',
  styleUrls: ['./update-milking-records.component.css']
})
export class UpdateMilkingRecordsComponent implements AfterViewInit {
  milkingForm: FormGroup;
  submitted = false;
  maxDate = new Date();
  
  // Accessed from dialog data
  private recordId: number;
  private idColumn;
  private paginator;
  private dataSource; 

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
  // Used in modal for close()
    public dialogRef: MatDialogRef<UpdateMilkingRecordsComponent>,
    private milkingService: MilkingService,
    private fb: FormBuilder,
    private updateDatatableService: UpdateDatatableService ) { }

  ngAfterViewInit() {
    this.createForm();
    this.fetchRecord();
  }


  // Fetch records
  public fetchRecord() {
    this.recordId = this.data.recordId;
    this.idColumn = this.data.idColumn;
    this.paginator = this.data.paginator;
    this.dataSource = this.data.dataSource;

    // Display the data retrieved from the data model to the form model.
    this.milkingService.getMilkingRecord(this.recordId)
        .subscribe(data => {
            this.fillForm(data);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            //this.handleError(err);
          });
  }


  // Form parameters
  private createForm() {
    this.milkingForm = this.fb.group({
      cow: this.fb.group({
        cowTag: [] 
      }),
      date: [],
      firstMilking: [''],
      secondMilking: ['',Validators.min(0)],
      otherMilking: ['',Validators.min(0)],
      remarks: ['']
    

    });   


  }

   // Populate the form, called above in fetchRecord().
   private fillForm(parsedData) {
    this.milkingForm.setValue({
      cowTag: parsedData.cow.cowTag,
      date: parsedData.date,
      firstMilking: parsedData.firstMilking,
      secondMilking: parsedData.secondMilking,
      otherMilking: parsedData.otherMilking,
      remarks: parsedData.remarks     
     
     
    });
 
   }


// Update records
  public update() {
    if (this.milkingForm.valid) {
      const formValue = this.milkingForm.value;
      this.milkingService.updateMilkingRecord(this.recordId, formValue)
      .subscribe(
        result => {
          // Update the table data view for the changes.
          this.updateDatatableService.updateDataTable(
            result, this.recordId, this.idColumn, this.paginator, this.dataSource, formValue);
          alert('Milking record updated successfully');
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
         // this.handleError(err);
        }
      );
    }
  }


  
//  Return for validation errors
public hasError = (controlName: string, errorName: string) => {
  return this.milkingForm.controls[controlName].hasError(errorName);
}


}
