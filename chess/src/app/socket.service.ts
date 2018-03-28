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
	this.sendUsername();
}
sendUsername():void{
	console.log("sending username")
    this.Socket.emit('username', "venket");
    this.Socket.on('checking', function(data) {
      console.log(data);
    });

  }
sendMessages(){
	this.messages.push(this.messageDummy);
}
getMessages(): Observable<Message[]>{
	return of(this.messages)
}

}
