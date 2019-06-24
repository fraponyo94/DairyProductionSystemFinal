import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showloading: boolean = false;
  public AnimationBarOption;
  constructor() { }

  ngOnInit() { }

}
