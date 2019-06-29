import { Component, OnInit,  ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { breeding } from '../../shared/model/models ';
import { BreedingService } from '../../services/breeding.service';
import { PdfServiceService } from '../../services/pdf-service.service';




@Component({
  selector: 'app-breeding-records',
  templateUrl: './breeding-records.component.html'
 
})
export class BreedingRecordsComponent implements OnInit  {
  
    // Cattle/Calf records
    public dataSource = new MatTableDataSource<breeding>();
    public breedingData : breeding[];

    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    // Column headers
    public displayedColumns = ['No', 'cowtag', 'date', 'dueDate', 'methodOfInsemination', 'reproductiveCondition', 
                                'reproductiveTreatment'  ];

    constructor(private breedingService: BreedingService, public dialog: MatDialog,private pdfService: PdfServiceService) { }

     data: breeding[];
    // Initialise parameters
    ngOnInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getAllBreedingHistory();
    }

  // Get all cattle records
    public getAllBreedingHistory  ()  {
      this.breedingService.getAllBreedingRecords()
      .subscribe(res => {
        this.dataSource.data = res as breeding[];
        this.breedingData = this.dataSource.data;
      });
    }


    // Filter
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }



    // Report (method to be called on the UI)

  downloadReport() {  
   
    const doc = this.breedingService.pdfTheme(this.breedingData.length,this.breedingData);
    this.pdfService.pdf('Breeding',doc);
   
  }
    //

   
    
  }
