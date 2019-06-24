import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalfService } from '../../services/calf.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { BreedService } from '../../services/breed/breed.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-calf',
  templateUrl: './calf.component.html',
  styleUrls: ['./calf.component.css']
})
export class CalfComponent implements OnInit {
  constructor( private breedService: BreedService, private fb: FormBuilder,
               private calfService: CalfService,private messagesService: MessagesService, private datePipe: DatePipe) { }
  // Date limit
  maxDate = new Date();

   // Form Builder
  private calfForm: FormGroup;


  //  Breed Autocomplete
 // breeds: breed[] = this.breedService.breeds;
  breeds: string[] = this.breedService.breeds;
  options: string[] = this.breedService.breeds;

  filteredOptions: Observable<string[]>;




  // Sex options
  calfSex = [
              {
                id: 1,
                value: 'Male'
              },
              {
                id: 1,
                value: 'Female'
              }];


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.breeds.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnInit() {
    this.createCalfForm();
  }




  // Create calf addition form
  private createCalfForm() {

    this.calfForm = this.fb.group({
      calfId: ['',Validators.required,Validators.minLength(4)],
      dateOfCalving: [new Date()],
      sex: ['',Validators.required],
      breed: this.fb.group({
       name: ['']
      }),
      cow: this.fb.group({
        cowTag: ['',Validators.required]
     }),
     remarks: ['',Validators.required]

    });


    this.filteredOptions = this.calfForm.controls.breed.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );


  }


  // Process onsubmit

   //  Processes form data
   onSubmit() {

    if (this.calfForm.invalid) {
           return;
    } else {
     const formData = this.calfForm.value;
     formData.dateOfCalving = this.datePipe.transform(this.calfForm.controls.dateOfCalving.value, "dd-MM-yyyy");
     console.log(JSON.stringify(formData));

     this.calfService.addCalf(formData)
       .subscribe(
         res => {
           this.success();
           this.calfForm.reset();
         },
         (err: HttpErrorResponse) => {
           console.log(err.error);
           console.log(err.message);
           this.handleError(err);
         }
       );

     this.calfForm.reset();
    }
  }


   // Get available breed records
   getBreeds() {
    this.breedService.getAllBreeds()
     .subscribe(data => this.breeds = data);

  }


  // Reset  form
  reset() {
   this.calfForm.reset();
 }


 private success() {
   this.messagesService.openDialog('Success', ' Saved successfully!');
 }

 private handleError(error) {
   this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
 }

 
 public hasError = (controlName: string, errorName: string) => {
  return this.calfForm.controls[controlName].hasError(errorName);
}


}