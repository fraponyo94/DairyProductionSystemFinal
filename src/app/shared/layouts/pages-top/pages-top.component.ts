import { Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/login/auth/auth-services/auth.service';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent {
  avatarImgSrc: string = 'assets/images/cow.ico';
  userName: string = 'Dairy Production';
  userPost: string = 'System';


  sidebarToggle: boolean = true;
  tip = { ring: true, email: true };

  constructor(private _globalService: GlobalService,private router: Router,private authService: AuthService) { }

  public _sidebarToggle() {
   

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);


  }

  // Log out
  logOut(){
    this.authService.logout();
  }
}
