import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { milking } from '../../shared/model/models ';
 

@Injectable({
  providedIn: 'root'
})
export class MilkingService {
  


  constructor(private http: HttpClient) { }
  private baseUrl = 'api/milking' ;


   // Add Milking Records
   addMilkingRecords( milking: object ): Observable<object> {
    return this.http.post(`${this.baseUrl}`, milking);
  }


    // Get all Miking Records
    getMilkingRecords(): Observable<any> {
      return this.http.get<milking>(`${this.baseUrl}`).pipe(
        catchError((error: any) => {
             console.error(error);
             return of();
           }),
      );
    }

  // Find Records given cowTag and date
  getRecordByCowwTagAndDate(cowTag: string, date: Date): Observable<any> {
      return this.http.get<milking>(`${this.baseUrl}/${cowTag}/${date}`);

  }


  // Update Milking records
  updateMilkingRecord(recordId: number, formValue: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${recordId}`, formValue);
  }

  // Find by record id
  getMilkingRecord(recordId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${recordId}`);
  }


  // pdf
  //Design pdf
  /*define key for identifying column and value to display in PDF table head. (Table head and not page header) */
public headRows() {

 
  return [{
      id: 'No',
      cowTag: 'Cow Tag',
      date: 'Date',
      firstMilking: 'Session 1(litres)',
      secondMilking: 'Session 2(litres)',
      thirdMilking: 'Session 3(litres)',
      total: 'Total (litres)'
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
          firstMilking: pdfBody[j].firstMilking,
          secondMilking: pdfBody[j].secondMilking,
          thirdMilking: pdfBody[j].otherMilking,
           total: pdfBody[j].firstMilking + pdfBody[j].secondMilking + pdfBody[j].otherMilking
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
