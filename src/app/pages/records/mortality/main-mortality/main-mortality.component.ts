import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-mortality',
  templateUrl: './main-mortality.component.html',
  styleUrls: ['./main-mortality.component.css']
})
export class MainMortalityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }

}
