import { Component, OnInit, ViewChild } from '@angular/core';
import { cattle, calf, mortality } from '../../shared/model/models ';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MortalityService } from '../../services/mortality.service';

@Component({
  selector: 'app-mortality-history',
  templateUrl: './mortality-history.component.html',
  styleUrls: ['./mortality-history.component.css']
})
export class MortalityHistoryComponent implements OnInit {
  
  isCalf: boolean = false;
  isCow: boolean = false;

 public dataLength: number;
 // Cattle/Calf records
 public dataSource = new MatTableDataSource<mortality>();

 
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 public displayedColumns = ['No','cowtag','date','postMortemreport','findings'  ];
 public displayedColumn = ['No','calfTag','date','postMortemreport','findings'  ];

 constructor(private mortalityService: MortalityService ) { }


 ngOnInit() {
   this.isCow = true;
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
   this.getAllMortalityRecords();
 }



// Get all cattle records
 public getAllMortalityRecords  ()  {
   this.mortalityService.getAllRecords()
   .subscribe(res => {
     this.dataSource.data = res as mortality[];
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
    this.getAllMortalityRecords();
 }
  
 //Cow
 cowHealth(){
   this.isCalf = false;
   this.isCow = true;
   this.getAllMortalityRecords();
}
}
