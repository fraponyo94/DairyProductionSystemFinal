import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


import {Observable, } from 'rxjs';

import { DatePipe } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { cattle } from '../../shared/model/models ';
import { CattleService } from '../../services/cattle/cattle.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { BreedingService } from '../../services/breeding.service';


@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html'
  
})
export class BreedingComponent implements OnInit {

  // Declare variables
  maxDate = new Date();
  cattles: Observable<cattle>;
  cattleForm: FormGroup;
  breedingForm: FormGroup;

  // For autocomplete
  cow = new FormControl();

  options: cattle[];
  filteredOptions: Observable<cattle[]>;




  constructor(private f: FormBuilder, private cattleService: CattleService, private breedingService: BreedingService,
              private datePipe: DatePipe, private messagesService: MessagesService ) { }


  // Initialize parameters here
  ngOnInit() {
    this.createBreedingForm();
    this.getCattles();
  }



// get cattles available for autocomplete functionality
  getCattles(): void {
    this.cattles = this.cattleService.getAllCattleRecords();
  }

  // Create form control names
  createBreedingForm() {
    this.breedingForm = this.f.group({
      cow: this.f.group({
                cowTag: ['',Validators.required]
      }),

      date: [new Date()],
      dueDate: [new Date()],
      methodOfInsemination: ['',Validators.required],
      reproductiveCondition: ['',Validators.required],
      reproductiveTreatment: ['']
    });
  }



 // Process form inputs
  onSubmit() {
    if (this.breedingForm.invalid) {
      return;
    } else {
    const formData = this.breedingForm.value;
    formData.date = this.datePipe.transform(this.breedingForm.controls.date.value, "dd-MM-yyyy");
    formData.dueDate = this.datePipe.transform(this.breedingForm.controls.dueDate.value, "dd-MM-yyyy");

    // Save
    this.breedingService.addBreeding(formData)
      .subscribe(
        res => {
          this.success();
          this.breedingForm.reset();

        },
        (err: HttpErrorResponse) => {
          if(err.status == 500){
            // this.handleError(err);
            this.messagesService.openDialog('Server Error', 'Error occured while saving your records. Please try again');
            return;
          }


        }
      );

    }

  }

  // Reset form input fields
  reset(){
    this.breedingForm.reset();
  }


  // Show on success
  private success() {
    this.messagesService.openDialog('Success', ' Your record is saved successly ');
  }

  // Sho on error occurence
  private handleError(error) {
    this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
  }


  // For validation
  public hasError = (controlName: string, errorName: string) => {
    return this.breedingForm.controls[controlName].hasError(errorName);
  }


}
