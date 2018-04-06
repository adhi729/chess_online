import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Message } from './class_defs/message_item';

import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
	private Socket;
	messages: Message[] = []; 
	messageDummy: Message = {data: "loooooll"};
  constructor() { 
	this.Socket = io();
}
ngOnInit():void{
	// console.log("lolololollo");
	// this.sendUsername();
}
sendUsername(username:string):void{
    this.Socket.emit('username',username);
    this.Socket.on('checking', function(data) {
      console.log(data);
    });
  }

makeMove(userId:string, matchId: string, move: number): void{
  console.log("hitted socket service")
   this.Socket.emit('makeMove',{'userId': userId, 'matchId':matchId, 'move': move});
   console.log("ëmitted?");
   this.Socket.on('makeMove', function(data) {
      console.log(data);
    });
}

  clearMessages(){
  	console.log(this.messages)
  	this.messages = [];
  }
sendMessages(){
  
	this.messages.push(this.messageDummy);
}
getMessages(): Observable<Message[]>{
	return of(this.messages)
}

}
