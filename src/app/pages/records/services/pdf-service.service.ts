import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }

 
  
// toPdf function to print the pdfBody which is an array of jsonobjects holding the table data into pdf.
 pdf(pdfName,doc: jsPDF) {    
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
   
    doc.save(pdfName); // this downloads a copy of the pdf in your local instance.
  }
  
}
