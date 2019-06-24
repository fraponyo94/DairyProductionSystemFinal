import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'content-top',
  templateUrl: './content-top.component.html',
  styleUrls: ['./content-top.component.scss']
})
export class ContentTopComponent {
  routeTitle;
  constructor(public _globalService: GlobalService,private router: Router) {
    this.getRouteTitle();
  }

  private getRouteTitle() {
    

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'isActived') {
        this.routeTitle = data.value.title;
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  returnHome() {
  
    this._globalService.dataBusChanged('isActived', { title: 'Profile' });
  }
}
