import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
  constructor(private router: Router) { }

  ngOnInit() {
  }
loginUser(e):void{
		e.preventDefault();
		var userid = e.target.elements[0].value;
		var pass = e.target.elements[1].value;

		if (userid=="user" && pass =="user"){
			this.router.navigate(['home']);
		}
	}
}
