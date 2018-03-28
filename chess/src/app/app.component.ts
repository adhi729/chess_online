import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { Message } from './class_defs/message_item'
import { SocketService } from './socket.service'
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;
  title = 'app';
  ngOnInit(): void{  
    this.sendUsername();
  }
  constructor(){
    this.socket = io();
  }
  private sendUsername():void{
    this.socket.emit('username', "venket");
    this.socket.on('checking', function(data) {
      console.log(data);
    });

  }
  
}
