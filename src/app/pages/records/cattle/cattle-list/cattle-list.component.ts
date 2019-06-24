import { Component, OnInit, ViewChild,AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { CattleService } from '../../services/cattle/cattle.service';
import { CattleData } from '../../shared/model/models ';
import { CalfDetailsComponent } from '../calf/calf-details/calf-details.component';


@Component({
  selector: 'app-cattle-list',
  templateUrl: './cattle-list.component.html'

  
})
export class CattleListComponent implements OnInit, AfterViewInit {

  private idColumn = 'tag';

  public dataLength: number;
  // Cattle/Calf records
  public cattleDateSource = new MatTableDataSource<CattleData>();

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['No','tag','name','date','calf','options'  ];

  // Calf details 
  private calfDetailsComponent: CalfDetailsComponent;

  constructor(private cattleService: CattleService, public dialog: MatDialog) { }


  ngOnInit() {
    this.getAllCattles();
  }

  ngAfterViewInit(): void {
    this.cattleDateSource .sort = this.sort;
    this.cattleDateSource.paginator = this.paginator;
 }


 // Get all cattle records
  public getAllCattles  ()  {
    this.cattleService.getAllCattleRecords()
    .subscribe(res => {
      this.cattleDateSource.data = res as CattleData[];
    });
  }


  // Filter
  public doFilter = (value: string) => {
    this.cattleDateSource.filter = value.trim().toLocaleLowerCase();
  }
  
  // View Calf Details
  public redirectToCalfDetails(id: string){
    // this.dialog.open(this.calfDetailsComponent, {
    //   data: {id, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.cattleDateSource},
    //   panelClass: 'full-width-dialog'
    // });
    
  }

  editRecord(id: string){

  }

  deleteRecord(id: string){

  }


 
}
