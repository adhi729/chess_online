import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../user-login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

	sessionID = 'lpwpldwkodww'
	profile: string = "";


  constructor(private userloginservice: UserLoginService) { }

  ngOnInit() {
    console.log(this.profile)
    this.setUserName();
  }
  setUserName():void{
    this.userloginservice.getUserName()
      .subscribe(profile => this.profile = profile);
      
    console.log(this.profile)
  }
}
