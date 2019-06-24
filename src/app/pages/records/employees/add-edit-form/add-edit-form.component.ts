


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMatcherService, errorMessages } from '../../services/services/form-validation/form-validators.service';





@Component({
  selector: 'app-add-edit-form',  
  templateUrl: './add-edit-form.component.html',
  styleUrls:['./add-edit-form.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditFormComponent implements OnInit {

  maxDate = new Date();
  public addEditEmployeeForm: FormGroup;


  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.
 
 



  public formErrors = {
     employeeId: '',
     name: '',
     email: '',
     phoneNumber: '',
     dateOfEmployment:''   

  };



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
      employeeId: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required ],
      dateOfEmployment: [new Date()],
    
    });
  }

 
  
}



