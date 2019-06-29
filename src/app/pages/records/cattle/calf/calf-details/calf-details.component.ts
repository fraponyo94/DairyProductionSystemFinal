import { Component, OnInit, Inject, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CalfService } from '../../../services/calf.service';
import { calf } from '../../../shared/model/models ';


@Component({
  selector: 'app-calf-details',
  templateUrl: './calf-details.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalfDetailsComponent implements AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Used in modal for close()
    public dialogRef: MatDialogRef<CalfDetailsComponent>,
    private calfService: CalfService) { }

  public dataSource = new MatTableDataSource<calf>();  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['No','calfId','sex','dateOfCalving','breed','remarks' ];

 // Initialise records
  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchRecord();
    }, 200);
  }


  // Get calf Records
  public fetchRecord() {
    this.dataSource = this.data.dataSource;  
  }


  // Filter
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
