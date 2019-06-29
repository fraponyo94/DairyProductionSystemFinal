import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  @ViewChild("pivot1") pivot1: FlexmonsterPivot;
 

  constructor() { }

  ngOnInit() {
  }

  onTabChange(index) {
    console.log("tab change", index);
    index++;
    if (this["pivot" + index]) {
      this["pivot" + index].flexmonster.refresh();
    }
} 

}