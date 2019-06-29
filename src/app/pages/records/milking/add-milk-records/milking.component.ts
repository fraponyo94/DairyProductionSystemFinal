import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { CattleService } from '../../services/cattle/cattle.service';
import { MilkingService } from '../../services/milking/milking.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { cattle } from '../../shared/model/models ';


@Component({
  selector: 'app-milking',
  templateUrl: './milking.component.html',
  styleUrls: ['./milking.component.css']
})
export class MilkingComponent implements OnInit {
  
  maxDate = new Date();
  constructor(private f: FormBuilder , private cattleService: CattleService,

              private milkingService: MilkingService, private datePipe: DatePipe, private messagesService: MessagesService ) { }

  // Variables
  milkingForm: FormGroup;
  cattles: Observable<cattle>;

  // Create form control names
  createMilkingForm() {
    this.milkingForm = this.f.group({
        cow: this.f.group({
                  cowTag: ['',Validators.required]
        }),

      date: [new Date(),Validators.required],
      firstMilking: ['',Validators.required],
      secondMilking: ['',Validators.min(0)],
      otherMilking: ['',Validators.min(0)],
      remarks: ['']

    });
  }

  ngOnInit() {
    this.createMilkingForm();
    this.getCattles();
  }


// get cattles available for autocomplete functionality
getCattles(): void {
  this.cattles = this.cattleService.getAllCattleRecords();
}


  // process milking form
  onSubmit() {
    if (this.milkingForm.invalid) {
      return;
    } else {
    const formData = this.milkingForm.value;
    formData.date = this.datePipe.transform(this.milkingForm.controls.date.value, "dd-MM-yyyy");
    console.log(JSON.stringify(formData));

    this.milkingService.addMilkingRecords(formData)
      .subscribe(
        res => {
          this.success();

        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.handleError(err);
        }
      );

    this.reset();
    }

  }



  // Reset form
  reset(){
    this.milkingForm.reset();
  }


  populateForm(cowTag: string,date: Date){
    const dateValue = this.datePipe.transform(date, 'dd-MM-yyyy');
    //this.fetchRecords()

  }



// Fetch Records given date and cowTag
fetchRecords(cowTag: string, date: Date){
  this.milkingService.getRecordByCowwTagAndDate(cowTag,date)
    .subscribe(data => {
      this.milkingForm.setValue({
        cowTag: data.cow[0].cowTag,
        date: data.date,
        firstMilking: data.firstMilking,
        secondMilking: data.secondMilking,
        otherMilking: data.otherMilking,
        remarks: data.remarks

      });
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.message);
      this.handleError(err);
    });

}

//  Return for validation errors
  public hasError = (controlName: string, errorName: string) => {
    return this.milkingForm.controls[controlName].hasError(errorName);
  }



  // Called on successfully saving
  private success() {
    this.messagesService.openDialog('Success', ' Saved successfully!');
  }

  // Error on saving
  private handleError(error) {
    this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
  }


}
