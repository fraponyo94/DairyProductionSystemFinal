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
  templateUrl: './breeding.component.html',
  styleUrls: ['./breeding.component.css']
})
export class BreedingComponent implements OnInit {
  
  maxDate = new Date();
  cattles: Observable<cattle>;
  isCowSelected = false;
  cattleForm: FormGroup;
  
  breedingForm: FormGroup;

  // For autocomplete
  cow = new FormControl();

  options: cattle[];
  filteredOptions: Observable<cattle[]>;

  private _filter(value: string): cattle[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.cowTag.toLowerCase().indexOf(filterValue) === 0);
  }


  constructor(private f: FormBuilder, private cattleService: CattleService, private breedingService: BreedingService,
              private datePipe: DatePipe, private messagesService: MessagesService ) {
    

   }


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



  // Show input form when corresponding co is selected
  proceed(): void {
    this.isCowSelected = true;

  }

  onSubmit() {
    if (this.breedingForm.invalid) {
      return;
    } else {
    const formData = this.breedingForm.value;
    formData.date = this.datePipe.transform(this.breedingForm.controls.date.value, "dd-MM-yyyy");
    formData.dueDate = this.datePipe.transform(this.breedingForm.controls.dueDate.value, "dd-MM-yyyy");
    console.log(JSON.stringify(formData));

    this.breedingService.addBreeding(formData)  
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

    this.breedingForm.reset();
    }

  }

  reset(){
    this.breedingForm.reset();

  }


  private success() {
    this.messagesService.openDialog('Success', ' Saved successfully!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
  }

  
  public hasError = (controlName: string, errorName: string) => {
    return this.breedingForm.controls[controlName].hasError(errorName);
  }


}
