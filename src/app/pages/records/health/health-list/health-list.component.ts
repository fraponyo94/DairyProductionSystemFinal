import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { health } from '../../shared/model/models ';
import { HealthService } from '../../services/health/health.service';

@Component({
  selector: 'app-health-list',
  templateUrl: './health-list.component.html',
  styleUrls: ['./health-list.component.css']
})
export class HealthListComponent implements OnInit {
   isCalf: boolean = false;
   isCow: boolean = false;

  public dataLength: number;
  // Cattle/Calf records
  public dataSource = new MatTableDataSource<health>();

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['No','cowtag','date','symptoms','diagnosis','treatMent','Remarks'  ];
  public displayedColumn = ['No','calfTag','date','symptoms','diagnosis','treatMent','Remarks'  ];

  constructor(private healthService: HealthService ) { }


  ngOnInit() {
    this.isCow = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllHealthRecords();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
}


// Get all cattle records
  public getAllHealthRecords  ()  {
    this.healthService.getAllRecords()
    .subscribe(res => {
      this.dataSource.data = res as health[];
    });
  }


  // Filter
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
 

//Calf
  calfhealth(){
     this.isCalf =true;
     this.isCow = false;
     this.getAllHealthRecords();
  }
   
  //Cow
  cowHealth(){
    this.isCalf = false;
    this.isCow = true;
    this.getAllHealthRecords();
 }

  

}
