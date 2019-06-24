import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-breeding',
  templateUrl: './main-breeding.component.html',
  styleUrls: ['./main-breeding.component.css']
})
export class MainBreedingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  public executeSelectedChange = (event) => {
    console.log(event);
  }
}
