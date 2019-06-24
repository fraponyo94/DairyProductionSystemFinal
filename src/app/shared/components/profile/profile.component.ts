import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  avatarImgSrc: string = 'assets/images/cow.ico';
  userName: string = 'Dairy Production';
  userPost: string = 'System'; 
  
  constructor() { }

  ngOnInit() {
  }

}
