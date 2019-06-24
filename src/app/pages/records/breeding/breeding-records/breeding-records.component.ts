import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { breeding } from '../../shared/model/models ';
import { BreedingService } from '../../services/breeding.service';

@Component({
  selector: 'app-breeding-records',
  templateUrl: './breeding-records.component.html',
  styleUrls: ['./breeding-records.component.css']
})
export class BreedingRecordsComponent implements OnInit ,AfterViewInit {

    private idColumn = 'cowTag';

    public dataLength: number;
    // Cattle/Calf records
    public dataSource = new MatTableDataSource<breeding>();

    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public displayedColumns = ['No','cowtag','date','dueDate','details','update','delete'  ];

   
    constructor(private breedingService: BreedingService, public dialog: MatDialog) { }


    ngOnInit() {
      this.getAllCattles();
    }

    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }


  // Get all cattle records
    public getAllCattles  ()  {
      this.breedingService.getAllBreedingRecords()
      .subscribe(res => {
        this.dataSource.data = res as breeding[];
      });
    }


    // Filter
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    
    // // View Calf Details
    // public redirectToCalfDetails(id: string){
    //   this.dialog.open(this.calfDetailsComponent, {
    //     data: {id, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.cattleDateSource},
    //     panelClass: 'full-width-dialog'
    //   });
      
    // }


    redirectToDetails(){
      
    }


    // update cattle details
    public redirectToUpdate (id: string){
      
    }


    // Delete calf records
    public redirectToDelete(id: string) {
      
  }
}
