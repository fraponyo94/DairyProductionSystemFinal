
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
  templateUrl: './add-cattle.component.html'

})
export class AddCattleComponent implements OnInit {
  addCattleForm: FormGroup;
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



  // Initialise parameters
  ngOnInit() {   
    this.createForm();


   // this.getBreeds();
  }


  // Form parameters
  private createForm() {
    this.addCattleForm = this.fb.group({
      cowTag: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
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

 // Validation
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
      formData.dateAcquired = this.datePipe.transform(this.addCattleForm.controls.dateAcquired.value, "dd-MM-yyyy");
      console.log(JSON.stringify(formData));

      this.cattleService.addCattle(formData)
        .subscribe(
          res => {
            this.messagesService.openDialog('Success', 'Cattle '+' addded successfully!');
            this.addCattleForm.reset();
          },
          (err: HttpErrorResponse) => {
            if(err.status === 500){
              this.messagesService.openDialog('Server Error', 'Error occurred while processing your request.');
              return;
            }
           
            //this.handleError(err);
          }
        );

      this.addCattleForm.reset();
     }
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




}


