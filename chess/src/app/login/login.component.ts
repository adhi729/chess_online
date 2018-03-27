import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '../user-login.service';
import io from "socket.io-client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
  constructor(private router: Router, private user: UserLoginService) { }

  ngOnInit() {

  }
loginUser(e):void{
		e.preventDefault();
		var userid = e.target.elements[0].value;
		var pass = e.target.elements[1].value;
		if (userid=="user" && pass =="user"){

			console.log(this.user.getUserLoggedIn,"login")
			this.user.setUserLoggedIn(userid);
			this.router.navigate(['home']);
			this.connectSocket(userid);

		}
	}
	connectSocket(userid: string): void{
		let socket = io.connect('http://localhost:3000');
		console.log(socket);
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('username', { name: userid });
  });
	}
	
}
