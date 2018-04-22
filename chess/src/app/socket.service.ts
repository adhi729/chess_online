import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Message } from './class_defs/message_item';

import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
	private Socket;
	move: number[];
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
      console.log(data,"inside sendusername");
      //this.sendRecievedMoves(data.move);
      //this.sendRecievedMoves(); 
    });
  }

makeMove(userId:string, matchId: string, move: number): void{
  console.log("hitted socket service")
   this.Socket.emit('makeMove',{'userId': userId, 'matchId':matchId, 'move': move});
   
}
public onMove():Observable<number> {
	console.log("inside onMove")
        return new Observable<number>(observer => {
            this.Socket.on('makeMove', (data) => observer.next(data.move));
        });
}
public onSpecialMoves(): Observable<number>{
	return new Observable<number>(observer => {
		this.Socket.on('makeSpecialMove',(data)=> observer.next(data.move))
	})
}
sendRecievedMoves(mov: number):void{
	this.move.push(mov);
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
