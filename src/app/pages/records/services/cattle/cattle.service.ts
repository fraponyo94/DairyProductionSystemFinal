import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { cattle, CattleData } from '../../shared/model/models ';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CattleService {

 
  //  Base Url
  private baseUrl = 'api/cows' ;  

  constructor(private http: HttpClient) { }

  // Add cattle record

  addCattle( cattle: Object ): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, cattle);
  }


  // Update cattle record
  updateCattle(id: string, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  // Get cattle by Id
  getCattle(id: string): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

   // Remove cattle  records
  deleteCattleRecord(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  // Get all Cattle Records
  getAllCattleRecords(): Observable<any> {
    return this.http.get<CattleData>(`${this.baseUrl}`).pipe(
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
      cowTag: 'Cattle Tag',
      name: 'Nick Name',
      dateAcquired: 'Date Acquired',
      breed: 'breed',
      calf: 'No of Calves'
  }];
}


/* bodyRows returns the pdfData in the form of jsonArray which is then parsed by the autoTable function */
bodyRows(rowCount, pdfBody) {
  rowCount = rowCount || 10;
  let body = [];
  for (var j = 0; j < rowCount; j++) {
      body.push({
          id: j+1,
          cowTag: pdfBody[j].cowTag,
          name: pdfBody[j].name,
          dateAcquired: pdfBody[j].dateAcquired,
          breed: pdfBody[j].breed.name,
          calf: pdfBody[j].calf
      });
  }
  return body;
}


// Define custom style/themes here
 pdfTheme(rowCount,pdfBody) {
  var doc = new jsPDF();
  doc.setFontSize(12); 
  var title ='Total Cattles in the farm: Report generated on '+ new Date();
  doc.text(title,14, 16); //default
  doc.autoTable({
      head: this.headRows(),
      body: this.bodyRows(rowCount,pdfBody),
      startY: 20 
  });
 
  return doc;
};


// toPdf function to print the pdfBody which is an array of jsonobjects holding the table data into pdf.
 pdf(pdfBody) {
  const doc = this.pdfTheme(pdfBody.length,pdfBody);
  const totalPagesExp = '{total_pages_count_string}'; // placeholder for total number of pages 
  doc.autoTable({


      /*whatever you write in didDrawPage comes in every page. Header or footer is determined from startY position in the functions.*/
      didDrawPage(data) {   
          // Header
          doc.setFontSize(12);
          
   
          // Footer
          const pageSize = doc.internal.pageSize;
          // jsPDF 1.4+ uses getHeight, <1.4 uses .height
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        
          let str = " Page " + doc.internal.getNumberOfPages()
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
              str = str + " of " + totalPagesExp;
          }
          doc.setFontSize(10);
          doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: {
          bottom: 60, // this decides how big your footer area will be
          top: 40 // this decides how big your header area will be.
      }
  });
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
  }
  const fileName = 'cattles.pdf';
  doc.save(fileName); // this downloads a copy of the pdf in your local instance.
}



}
