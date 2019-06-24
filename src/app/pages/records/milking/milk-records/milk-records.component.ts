import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';

import { merge, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { milkRecords } from '../../shared/model/models ';
import { MilkingService } from '../../services/milking/milking.service';
import { MessagesService } from '../../services/services/messages-service/messages.service';
import { ConfirmService } from '../../services/services/confirm-dialog/confirm.service';

@Component({
  selector: 'app-milk-records',
  templateUrl: './milk-records.component.html',
  styleUrls: ['./milk-records.component.css']
})
export class MilkRecordsComponent implements AfterViewInit {
  isCowSelected : boolean;
  isDateSelected : boolean;
  position : number = 1;

  private idColumn = 'employeeId';
  public dataLength: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = [
    'No',
    'Date',
    'cow',
    'milk',
    'details' 
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
public milkDataSource = new MatTableDataSource<milkRecords>();

// Query Criteria
  public searchTerm$ = new Subject<string>();


// Constructor
  constructor( private httpService: MilkingService, public dialog: MatDialog, private confirmService: ConfirmService,
               private messagesService: MessagesService) {

                // Filter
                this.milkDataSource.filterPredicate = (data, filter) =>{
                    if (this.fromDate && this.toDate) {
                      return data.date >= this.fromDate && data.date <= this.toDate;
                    }
                    return true;
                  }
               }


  // Initialise parameters in AfterViewInit
  ngAfterViewInit() {
    this.isCowSelected = false;
    this.isDateSelected = false;
    this.milkDataSource.paginator = this.paginator;
    setTimeout(() => {
      this.getAllRecords();
    }, 200);
  }

  // Filter by Date
  applyFilter() {
    this.milkDataSource.filter = ''+Math.random();
  }

// Retrieve All Milk Records
  private getAllRecords(): any {
    // Kills the paginator if omitted.
    this.milkDataSource.paginator = this.paginator;

    merge(this.paginator.page).pipe(
      // Tap called only with page forward.
      tap(val => console.log('page forward in getAllRecords')),
      startWith(null),  // Delete this and no data is downloaded.
      switchMap(() => {
        console.log('paginator.pageIndex: ', this.paginator.pageIndex);
        console.log('paginator.length: ', this.paginator.length);  // Should show all records for the second page, index 1.
        return this.httpService.getMilkingRecords();
      }),
    )

    .subscribe(data => {
      console.log(data.length);
      const milkRecords: milkRecords[] = data;
      this.dataLength = milkRecords.length;

      this.milkDataSource.data = milkRecords;
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

}
