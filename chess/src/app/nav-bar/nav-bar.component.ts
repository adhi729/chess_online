import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../user-login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

	sessionID = 'lpwpldwkodww'
	profile = {
		roll : '',
		
	}


  constructor(private user: UserLoginService) { }

  ngOnInit() {
    this.setUserName;
  }
  setUserName():void{
    console.log(this.user.getUserLoggedIn,"nav");
    if (this.user.getUserLoggedIn){
      this.profile.roll = this.user.getUserName();
    }
  }
}
