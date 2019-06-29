import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CattleService } from '../../services/cattle/cattle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UpdateDatatableService } from '../../services/services/update-datatable.service';
import { BreedService } from '../../services/breed/breed.service';

@Component({
  selector: 'app-update-cattle',
  templateUrl: './update-cattle.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UpdateCattleComponent implements AfterViewInit,OnInit {
  addCattleForm: FormGroup;
  submitted = false;
  maxDate = new Date();
  filteredOptions: Observable<string[]>;
  
  private recordId: string;
  private idColumn;
  private paginator;
  private dataSource;
  breeds: string[] = this.breedService.breeds;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.breeds.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
  // Used in modal for close()
    public dialogRef: MatDialogRef<UpdateCattleComponent>,
    private cattleService: CattleService,
    private fb: FormBuilder,
    private updateDatatableService: UpdateDatatableService,
    private breedService: BreedService ) { }

  ngAfterViewInit() {
    // this.createForm();
    // this.fetchRecord();
  }
  ngOnInit(){
    this.createForm();
    this.fetchRecord();

  }


  // Fetch records
  public fetchRecord() {
    this.recordId = this.data.recordId;
    this.idColumn = this.data.idColumn;
    this.paginator = this.data.paginator;
    this.dataSource = this.data.dataSource;

    // Display the data retrieved from the data model to the form model.
    this.cattleService.getCattle(this.recordId)
        .subscribe(data => {
            this.fillForm(data);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            //this.handleError(err);
          });
  }


  // Form parameters
  private createForm() {
    this.addCattleForm = this.fb.group({
      cowTag: [''],
      name: ['', Validators.required],
      breed: this.fb.group({
       name: ['']
      }),
      dateAcquired: ['']

    });

    this.filteredOptions = this.addCattleForm.controls.breed.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );


  }

   // Populate the form, called above in fetchRecord().
   private fillForm(parsedData) {
    this.addCattleForm.setValue({
      cowTag: parsedData.cowTag,
      name: parsedData.name,
     // breed: parsedData.breed,            
      dateAcquired: parsedData.dateAcquired,
     
     
    });
 
  }


// Update records
  public update() {
    if (this.addCattleForm.valid) {
      const formValue = this.addCattleForm.value;
      this.cattleService.updateCattle(this.recordId, formValue)
      .subscribe(
        result => {
          // Update the table data view for the changes.
          this.updateDatatableService.updateDataTable(
            result, this.recordId, this.idColumn, this.paginator, this.dataSource, formValue);
          alert('Cattle updated successfully');
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
         // this.handleError(err);
        }
      );
    }
  }


}
