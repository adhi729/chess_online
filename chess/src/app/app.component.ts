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
  messages: Message[] = [];
  ngOnInit(): void{  
  }
  constructor(private socketService: SocketService){
  }
  
private sendMessageTemp(){
    console.log("sending temp message");
    //this.socketService.sendUsername();
    this.socketService.sendMessages();
  }
 getMessages():void{
   console.log("getting messages")
   this.socketService.getMessages()
      .subscribe(messages => this.messages = messages);
 }
}
