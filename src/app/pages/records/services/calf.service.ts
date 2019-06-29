import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { calf } from '../shared/model/models ';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
 


@Injectable({
  providedIn: 'root'
})
export class CalfService {
  
  

  constructor(private http: HttpClient) { }
  private baseUrl = 'api/calfs' ;


   // Get all Calf Records
   getAllCalfRecords(): Observable<any> {
    return this.http.get<calf>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  // Add Calf Records
  addCalf( calf : Object ): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, calf);
  }

  // Get calf records given Id
  getCalfRecordsByCowTag(recordId: string): Observable<Object> {  
    const url =`${this.baseUrl}`+'/'+'cow'+`${recordId}`
    return this.http.get(`${url}`);
  }


   //Design pdf
  /*define key for identifying column and value to display in PDF table head. (Table head and not page header) */
public headRows() {

 
  return [{
      id: 'No',
      date: 'Date',
      cowTag: 'Parent Tag',      
      calfId: 'Calf Id',
      breed: 'Breed',
      sex: 'Sex',
      remarks: 'remarks',
     
  }];
}


/* bodyRows returns the pdfData in the form of jsonArray which is then parsed by the autoTable function */
bodyRows(rowCount, pdfBody) {
  rowCount = rowCount || 10;
  let body = [];
  for (var j = 0; j < rowCount; j++) {
      body.push({
          id: j+1,
          date: pdfBody[j].dateOfCalving,
          cowTag: pdfBody[j].cow.cowTag,
          calfId : pdfBody[j].calfId,
          breed: pdfBody[j].breed.name,
          sex: pdfBody[j].secondMilking,
          remarks: pdfBody[j].dateOfCalving
         
      });
  }
  return body;
}


// Define custom style/themes here
 pdfTheme(rowCount,pdfBody) {
  var doc = new jsPDF();
  doc.setFontSize(12); 
  var title ='Total Calves : Report generated on '+ new Date();
  doc.text(title,14, 16); //default
  doc.autoTable({
      head: this.headRows(),
      body: this.bodyRows(rowCount,pdfBody),
      startY: 20 
  });
 
  return doc;
}

}
