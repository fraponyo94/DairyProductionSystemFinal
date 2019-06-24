import { Component, OnInit, Inject, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CalfService } from '../../../services/calf.service';
import { calf } from '../../../shared/model/models ';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-calf-details',
  templateUrl: './calf-details.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalfDetailsComponent implements OnInit,AfterViewInit {

  private recordId: string;


  public dataSource = new MatTableDataSource<calf>();  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['No','calfId','sex','dateOfCalving','breed','remarks' ];

 

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              // Used in modal for close()
              public dialogRef: MatDialogRef<CalfDetailsComponent>,
              private calfService: CalfService) { }

  ngOnInit() { }


 
  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchRecord();
    }, 200);
  }


  // Get calf Records
  public fetchRecord() {
    this.recordId = this.data.id;    

    // Retrieve date
    this.calfService. getCalfRecordsByCowTag(this.recordId)
        .subscribe(data => {
          this.dataSource.data = data as calf[];
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            
          });
  }


  // Filter
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
