

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { calf } from '../../shared/model/models ';
import { CalfService } from '../../services/calf.service';
import { HealthService } from '../../services/health/health.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';




@Component({
  selector: 'app-calf-health',
  templateUrl: './calf-health.component.html',
  styleUrls: ['./calf-health.component.css']
})
export class CalfHealthComponent implements OnInit {
  calfHealthForm: FormGroup;
  calfs: Observable<calf>;

  constructor(private f: FormBuilder , private calfService: CalfService,
              private healthService: HealthService, private datePipe: DatePipe,private messagesService: MessagesService) { }

  ngOnInit() {
    this.createhealthForm();
    this.getCalfs();
  }



   // Create form control names
   createhealthForm() {
    this.calfHealthForm = this.f.group({ 
      calf: this.f.group({
        calfId: ['',Validators.required]
      }), 
         
      date: [],
      history: [''],
      symptoms: [''],
      diagnosis: [''],
      treatment: [''],
      remarks: [''],
      nameOfveterinaryDoctor: [''],
      contactofVeterinaryDoctor: [],
      costOfTreatMent: [],
 
    });
  }

     
// get cattles available for autocomplete functionality
    getCalfs(): void {
          this.calfs = this.calfService.getAllCalfRecords();
}


  reset(){
   this.calfHealthForm.reset(); 
  }

  //Process form
  onSubmit(){
    if (this.calfHealthForm.invalid) {
      return;
    } else {
    const formData = this.calfHealthForm.value;
    formData.date = this.datePipe.transform(this.calfHealthForm.controls.date.value, "dd-MM-yyyy");   
    console.log(JSON.stringify(formData));

    this.healthService.addHealthRecords(formData)  
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


  
  private success() {
    this.messagesService.openDialog('Success', ' Saved successfully!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'Error saving,Please contact the system administrator.');
  }



}

