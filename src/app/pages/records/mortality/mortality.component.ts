import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { CattleService } from '../services/cattle/cattle.service';
import { MessagesService } from '../services/services/messages-service/messages.service';
import { MortalityService } from '../services/mortality.service';
import { cattle, calf } from '../shared/model/models ';
import { CalfService } from '../services/calf.service';


@Component({
  selector: 'app-mortality',
  templateUrl: './mortality.component.html',
  styleUrls: ['./mortality.component.css']
})
export class MortalityComponent implements OnInit {
  maxDate = new Date();

  constructor(private f: FormBuilder , private cattleService: CattleService, private mortalityService: MortalityService,
              private datePipe: DatePipe, private messagesService: MessagesService,private calfService:  CalfService) { }

  //
  mortalityForm: FormGroup;
  cattles: Observable<cattle>;
  calfs: Observable<calf>;

  // Create form control names
  createMortalityForm() {
    this.mortalityForm = this.f.group({
      cow: this.f.group({
        cowTag: ['',Validators.required]
      }),
      calf: this.f.group({
         calfId: ['',Validators.required]
      }),
      postMortemReport: [''],
      findings: [''],
      date: [new Date()]
      
    });
  }

  ngOnInit() {
    this.createMortalityForm();
    this.getCattles();
    this.getCalfs();
  }

  // process mortality form
  onSubmit() {
    if (this.mortalityForm.invalid) {
      return;
    } else {
    const formData = this.mortalityForm.value;
    formData.date = this.datePipe.transform(this.mortalityForm.controls.date.value, "dd-MM-yyyy");   
    console.log(JSON.stringify(formData));

    this.mortalityService.addMortalityRecords(formData)  
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

    
// get cattles available for autocomplete functionality
getCattles(): void {
  this.cattles = this.cattleService.getAllCattleRecords();
}

// get cattles available for autocomplete functionality
getCalfs(): void {
  this.calfs= this.calfService.getAllCalfRecords();
}


  // Reset form
  reset(){
    this.mortalityForm.reset();
  }


  
  private success() {
    this.messagesService.openDialog('Success', ' Saved successfully!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
  }

}
