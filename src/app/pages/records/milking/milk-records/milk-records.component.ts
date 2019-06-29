import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';

import { merge, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import {  milking } from '../../shared/model/models ';
import { MilkingService } from '../../services/milking/milking.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { ConfirmService } from '../../services/services/confirm-dialog/confirm.service';
import { UpdateMilkingRecordsComponent } from '../update-milking-records/update-milking-records.component';
import { PdfServiceService } from '../../services/pdf-service.service';

@Component({
  selector: 'app-milk-records',
  templateUrl: './milk-records.component.html',
  styleUrls: ['./milk-records.component.css']
})
export class MilkRecordsComponent implements OnInit {
  isCowSelected : boolean;
  isDateSelected : boolean;
  position : number = 1;

  private idColumn = 'id';
  public dataLength: number;
  data: milking[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = [
    'No',
    'Date',
    'cow',
    'first',
    'second',
    'other',
    'remarks',
    'option' 
  ];


// Attributes for filtering
filter = [
    {
      id: 1,
      value: 'ALL'
    },
    {
      id: 1,
      value: 'date'
    },
    {
      id: 2,
      value: 'cow'
    }];



// Date Filter form
dateFilterForm =  new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});

// Date Range
get fromDate() { return this.dateFilterForm.get('fromDate').value; }
get toDate() { return this.dateFilterForm.get('toDate').value; }

// Milk records
public milkDataSource = new MatTableDataSource<milking>();

// Query Criteria
  public searchTerm$ = new Subject<string>();


// Constructor
  constructor( private httpService: MilkingService, public dialog: MatDialog, private confirmService: ConfirmService,
               private messagesService: MessagesService,private pdfService: PdfServiceService) {

                // Filter
                this.milkDataSource.filterPredicate = (data, filter) =>{
                    if (this.fromDate && this.toDate) {
                      return data.date >= this.fromDate && data.date <= this.toDate;
                    }
                    return true;
                  }
               }


  // Initialise parameters in AfterViewInit
  ngOnInit() {
    this.isCowSelected = false;
    this.isDateSelected = false;
    this.milkDataSource.paginator = this.paginator;
    this.milkDataSource .sort = this.sort;
    setTimeout(() => {
      this.getAllRecords();
    }, 200);
  }

  // Filter by Date
  applyFilter() {
    this.milkDataSource.filter = ''+Math.random();
  }


   // Filter
   public doFilter = (value: string) => {
    this.milkDataSource.filter = value.trim().toLocaleLowerCase();
  }


// Retrieve All Milk Records
  private getAllRecords(): any {
    // Kills the paginator if omitted.
    this.milkDataSource.paginator = this.paginator;

    return this.httpService.getMilkingRecords()
    //   }),
    // )

    .subscribe(res => {
      console.log(res.length);
// tslint:disable-next-line: no-shadowed-variable
      const milkRecords: milking[] = res;
      this.dataLength = milkRecords.length;
      console.log(milkRecords);
      this.milkDataSource.data = milkRecords;
      this.data = milkRecords;
      
    
    },
    (err: HttpErrorResponse) => {
    console.log(err.error);
    console.log(err.message);
    });
  }


  // event handler for the select element's change event
  selectChangeHandler (value: any) {
    // update the ui
    console.log(value +'dfghjkl');
    if (value != null && value === 'date') {
      this.isCowSelected = false;
      this.isDateSelected = true;
    } else
       if (value != null && value === 'cow') {
      this.isCowSelected = true;
      this.isDateSelected = false;
    }
}

// ----------- EDIT & UPDATE -------------
public editRecord(recordId) {
  this.dialog.open(UpdateMilkingRecordsComponent, {
    data: { recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.milkDataSource },
    panelClass: 'full-width-dialog'
  });
}


  // Report (method to be called on the UI)
  downloadReport() {     
    const doc = this.httpService.pdfTheme(this.data.length,this.data);
    this.pdfService.pdf('milking',doc);
   
  }


}
