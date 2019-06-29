


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-form',  
  templateUrl: './add-edit-form.component.html',
  styleUrls:['./add-edit-form.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditFormComponent implements OnInit {
  

  maxDate = new Date();
  public addEditEmployeeForm: FormGroup;


  constructor(
   private fb: FormBuilder
   
  ) {
    
  }

  ngOnInit() {
    this.createForm(); 
    
  }


  // The reactive model that is bound to the form.
  public createForm() {
    this.addEditEmployeeForm = this.fb.group({
      employeeId: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      name: ['', Validators.required],
      email: ['',  Validators.compose([Validators.required,Validators.email])],
      phoneNumber: ['', Validators.compose([Validators.required,Validators.minLength(9),Validators.maxLength(12)]) ],
      dateOfEmployment: [new Date()],
    
    });
  }



  // Get form fields 
  get f() { return this.addEditEmployeeForm.controls; }

  
}



