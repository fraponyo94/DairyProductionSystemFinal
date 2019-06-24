import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, MatTableDataSource } from '@angular/material';


import { merge, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { Employee } from '../shared/model/models ';
import { EmployeeService } from '../services/employee.service';
import { ConfirmService } from '../services/services/confirm-dialog/confirm.service';
import { MessagesService } from '../services/services/messages-service/messages.service';





@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})


export class EmployeesComponent implements AfterViewInit {

private idColumn = 'employeeId';


//employees: observable<any>; 
private dsData: any;

 // dataSource: MatTableDataSource<EmployeeModel>;
@ViewChild(MatPaginator) paginator: MatPaginator;

  public dataLength: number;

  private addEmployeeComponent = AddEmployeeComponent;
  private editEmployeeComponent = EditEmployeeComponent;

  private idArray: number[] = [];  // Create array for checkbox selection in table.
  private memberArray = [];

 public displayedColumns = [
      'select',
      'name',
      'email',
      'phone',     
      'options'
  ];

  public dataSource = new MatTableDataSource<Employee>();



  // For last name query
  public searchTerm$ = new Subject<string>();

  constructor(
    private httpService: EmployeeService,
    public dialog: MatDialog,
    private confirmService: ConfirmService,
    private messagesService: MessagesService

    ) {


    // ------  LAST NAME SERCH -------------

    this.httpService.nameSearch(this.searchTerm$)
    .subscribe(data => {
        this.dataLength = data.length;
        this.dataSource.data = data;
      });
    }



  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        this.getAllRecords();
        console.log(this.dataSource)
      }, 200);
    }


  private getAllRecords(): any {
    // Kills the paginator if omitted.
    this.dataSource.paginator = this.paginator;

    merge(this.paginator.page).pipe(
      // Tap called only with page forward.
      tap(val => console.log('page forward in getAllRecords')),
      startWith(null),  // Delete this and no data is downloaded.
      switchMap(() => {
        console.log('paginator.pageIndex: ', this.paginator.pageIndex);
        console.log('paginator.length: ', this.paginator.length);  // Should show all records for the second page, index 1.
        return this.httpService.getEmployeesRecords();
      }),
    )

    .subscribe(data => { 
      const employees: Employee[] = data;
      this.dataLength = employees.length;

      this.dataSource.data = employees;
    },
    (err: HttpErrorResponse) => {
    console.log(err.error);
    console.log(err.message);
    });
  }



  public addRecord() {
    this.dialog.open(this.addEmployeeComponent, {panelClass: 'full-width-dialog'});
  }


  // ----------- EDIT & UPDATE --------------

  public editRecord(recordId) {
    this.dialog.open(this.editEmployeeComponent, {
      data: {recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.dataSource},
      panelClass: 'full-width-dialog'
    });
  }



// --------------- DELETE ------------------

  public deleteRecord(recordId) {
    const dsData = this.dataSource.data;

    const record = dsData.find(obj => obj[this.idColumn] === recordId);

    // Call the confirm dialog component
    this.confirmService.confirm(name, 'Do you want to delete,[employee Name]').pipe(
      switchMap(res => {if (res === true) {

        return this.httpService.deleteEmployee(recordId);
      }}))
      .subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this.deleteRowDataTable (recordId, this.idColumn, this.paginator, this.dataSource);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.messagesService.openDialog('Error', 'Delete did not happen.');
        }
      );
  }

// Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }




  // Called each time a checkbox is checked in the mat table.
  public selectMember(selectedMember) {
    // push the id's into an array then call it with the button.
    return this.idArray.push(selectedMember);
  }

  // Called by the Show Selected button.
  public getAllSelected() {
    this.memberArray = [];
    const tempArray = [];
    const ds = this.dataSource.data;
    const property = 'id';

    this.idArray.forEach(function(id, i) {

      // Need to match ids in idArray with dataSource.data.
       const memberId: number = id;  // Extracts member id from selection array.

      // Search dataSource for each member_id and push those selected into a new data object.
       ds.forEach(function(member, index) {

        if (ds[index][property] === memberId) {
          tempArray.push(member);
        }
      });
    });

    this.idArray = []; // Empty the array for next query.
    this.memberArray = tempArray;
    this.paginator.pageIndex = 0;
    this.dataSource.data = this.memberArray;
  }

// -----------  UTILITIES ------------------


  private success() {
    this.messagesService.openDialog('Success', 'Saved successfully!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'No database connection.');
  }




}
