import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CattleService } from '../services/cattle/cattle.service';
import { HealthService } from '../services/health/health.service';
import { cattle } from '../shared/model/models ';



@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
  constructor(){}
  ngOnInit(){
    
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }
}
