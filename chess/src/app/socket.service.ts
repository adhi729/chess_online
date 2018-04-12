import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Message } from './class_defs/message_item';

import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
	private Socket;
	private move: number;
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
    this.Socket.on('makeMove', function(data) {
      console.log(data);
      this.move = 1141;
      //this.sendRecievedMoves(); 
    });
  }

makeMove(userId:string, matchId: string, move: number): void{
  console.log("hitted socket service")
   this.Socket.emit('makeMove',{'userId': userId, 'matchId':matchId, 'move': move});
   
}

sendRecievedMoves(): Observable<number>{
	return of(this.move)
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
