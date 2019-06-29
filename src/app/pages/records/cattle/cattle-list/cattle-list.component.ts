import { Component, OnInit, ViewChild,AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { CattleService } from '../../services/cattle/cattle.service';
import { CattleData, calf, cattle } from '../../shared/model/models ';
import { CalfDetailsComponent } from '../calf/calf-details/calf-details.component';
import { HttpErrorResponse } from '@angular/common/http';

import { CalfService } from '../../services/calf.service';
import { UpdateCattleComponent } from '../update-cattle/update-cattle.component';
import { PdfServiceService } from '../../services/pdf-service.service';




@Component({
  selector: 'app-cattle-list',
  templateUrl: './cattle-list.component.html'  
})
export class CattleListComponent implements OnInit {
  private idColumn = 'cowTag';

  
  public dataLength: number;
  // Cattle/Calf records
  public cattleDateSource = new MatTableDataSource<CattleData>();
  public calfDataSource = new MatTableDataSource<calf>();
  public data : cattle[];

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['No','tag','name','date','calf','options'  ];

  

  constructor(private cattleService: CattleService, private calfService: CalfService, private dialog: MatDialog,
              private pdfService: PdfServiceService) { }


  ngOnInit() {
    this.cattleDateSource.paginator = this.paginator;
    this.cattleDateSource.sort = this.sort;

    // Initialise datasource
    setTimeout(() => {
      this.getAllCattles();
   }, 200);
    
  }

 

 // Get all cattle records
  public getAllCattles  ()  {
      // Kills the paginator if omitted.
      this.cattleDateSource.paginator = this.paginator;

      // Get records  
      this.cattleService.getAllCattleRecords()
       
    .subscribe(res => {
      const cattles: CattleData[] = res;
      this.dataLength = cattles.length;
      this.cattleDateSource.data = cattles;
      this.data = cattles;
    },
    (err: HttpErrorResponse) => {
      //Handle Error
    });
  }


  // Find calves given cow Tag
   getCalvesByParent(cowTag: string){
     this.calfService.getCalfRecordsByCowTag(cowTag)
     .subscribe(data =>{
       this.calfDataSource.data = data as calf[];

     },
     (err: HttpErrorResponse) => {

     });

   }

  // Filter
  public doFilter = (value: string) => {
    this.cattleDateSource.filter = value.trim().toLocaleLowerCase();
  }
  
  // View Calf Details
  public redirectToCalfDetails(id: string){
    this.getCalvesByParent(id);
    if(this.calfDataSource.data.length === 0){
          alert('No calf records that corresponds to cow selected available,please add first');
    } else{
         this.dialog.open(CalfDetailsComponent,{data: {dataSource: this.calfDataSource}});
    }
    
  }

  // Update cattle records
  editRecord(recordId){
    this.dialog.open(UpdateCattleComponent, {
      data: { recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.cattleDateSource },
      panelClass: 'full-width-dialog'

   });
 }

 // Generate pdf 
  // Report (method to be called on the UI)

  downloadReport() {  
   
    const doc = this.cattleService.pdfTheme(this.data.length,this.data);
    this.pdfService.pdf('cattles',doc);
   
  }

}
