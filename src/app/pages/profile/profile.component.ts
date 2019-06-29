import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Employee } from '../records/shared/model/models ';
import { EmployeeService } from '../records/services/employee.service';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../login/auth/auth-services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showloading: boolean = false;
  public AnimationBarOption;
   profile : FormGroup;
   employees: Employee[];
  constructor(private f: FormBuilder,private employeeService: EmployeeService,private storageService: TokenStorageService) {
   
     }


  ngOnInit() { 
        
    this.profile = new FormGroup({          
      name: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),

    });
   // this.getUser();
    // this.fillForm(this.employees);
  }

   // Populate the form, called above in fetchRecord().
   private fillForm(parsedData) {
    this.profile.setValue({  
      name: parsedData.name,
      email: parsedData.email,
      phoneNumber: parsedData.phoneNumber, 
     
    })};

    getUser(){
      const email = this.storageService.getUsername();
      this.employeeService.getEmployeesByEmail(email).subscribe(data => {
         this.employees = data ;        
        
        },
        (err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status == 418) {
           // this.error = 'service Unavailable';
          }
          console.log(err.error);
          console.log(err.message);
        });
      }
    

}
