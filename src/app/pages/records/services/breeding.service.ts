import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { breeding } from '../shared/model/models ';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
 

@Injectable({
  providedIn: 'root'
})
export class BreedingService {
  
  
  constructor(private http: HttpClient) { }
  private baseUrl = 'api/breedings' ;

   // Add Breeding
   addBreeding( breeding: object ): Observable<object> {

    return this.http.post(`${this.baseUrl}`, breeding);
  }


  // Find all breeding Records
  getAllBreedingRecords( ): Observable<any> {
    return this.http.get<breeding>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  //Design pdf
  /*define key for identifying column and value to display in PDF table head. (Table head and not page header) */
  public headRows() {

    return [{
        id: 'No',
        cowTag: 'Cow Tag',
        date: 'Date of Breeding',
        dueDate: 'Expected Delivery',
        methodOfInsemination: 'Method of Insemination',
        reproductiveCondition: 'Reproductive Condition',
        reproductiveTreatment: 'Treatment Offered',
        
    }];
  }
  
  
  /* bodyRows returns the pdfData in the form of jsonArray which is then parsed by the autoTable function */
  bodyRows(rowCount, pdfBody) {
    rowCount = rowCount || 10;
    let body = [];
    for (var j = 0; j < rowCount; j++) {
        body.push({
            id: j+1,
            cowTag: pdfBody[j].cow.cowTag,
            date : pdfBody[j].date,
            dueDate: pdfBody[j].dueDate,
            methodOfInsemination: pdfBody[j].methodOfInsemination,
            reproductiveCondition: pdfBody[j].reproductiveCondition,
            reproductiveTreatment: pdfBody[j]. reproductiveTreatment,
           
        });
    }
    return body;
  }
  
  
  // Define custom style/themes here
   pdfTheme(rowCount,pdfBody) {
    var doc = new jsPDF();
    doc.setFontSize(12); 
    var title ='Milking Records generated on '+ new Date();
    doc.text(title,14, 16); //default
    doc.autoTable({
        head: this.headRows(),
        body: this.bodyRows(rowCount,pdfBody),
        startY: 20 
    });
   
    return doc;
  }


}







