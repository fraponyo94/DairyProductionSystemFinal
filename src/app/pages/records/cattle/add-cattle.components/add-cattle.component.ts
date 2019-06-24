
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { CattleService } from '../../services/cattle/cattle.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { BreedService } from '../../services/breed/breed.service';

@Component({
  selector: 'app-add-cattle',
  templateUrl: './add-cattle.component.html',
  styleUrls: ['./add-cattle.component.css']
})
export class AddCattleComponent implements OnInit {
  addCattleForm: FormGroup;
  isPurchased = false;
  submitted = false;
  maxDate = new Date();

//  Breed Autocomplete
 // breeds: breed[] = this.breedService.breeds;
  breeds: string[] = this.breedService.breeds;
  options: string[] = this.breedService.breeds;

  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.breeds.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  constructor(  private fb: FormBuilder, private cattleService: CattleService,
                private messagesService: MessagesService, private breedService: BreedService, private datePipe: DatePipe  ) { }


  ngOnInit() {   
    this.createForm();


   // this.getBreeds();
  }


  private createForm() {

    this.addCattleForm = this.fb.group({
      cowTag: ['', Validators.required],
      name: ['', Validators.required],
      breed: this.fb.group({
       name: ['']
      }),
      dateAcquired: [new Date()]

    });

    this.filteredOptions = this.addCattleForm.controls.breed.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );


  }


  public hasError = (controlName: string, errorName: string) => {
    return this.addCattleForm.controls[controlName].hasError(errorName);
  }


   //  Processes form data
   onSubmit() {
     this.submitted = true;
     if (this.addCattleForm.invalid) {
            return;
     } else {
      const formData = this.addCattleForm.value;
      formData.dateAcquired = this.datePipe.transform(this.addCattleForm.controls.dateAcquired.value, "MM-yyyy");
      console.log(JSON.stringify(formData));

      this.cattleService.addCattle(formData)
        .subscribe(
          res => {
            this.success();
            this.addCattleForm.reset();
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            this.handleError(err);
          }
        );

      this.addCattleForm.reset();
     }
   }


   purchased() {
     this.isPurchased = true;
   }

   // Get available breed records
   getBreeds() {
     this.breedService.getAllBreeds()
      .subscribe(data => this.breeds = data);

   }


   // Reset  form
   reset() {
    this.addCattleForm.reset();
  }


  private success() {
    this.messagesService.openDialog('Success', ' Saved successfully!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
  }




}


