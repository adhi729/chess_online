import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from './class_defs/message_item';

import * as socketIo from 'socket.io-client';

const SERVER_URL =  'http://localhost:4000';

@Injectable()
export class SocketService {
	private Socket;

	public initSocket(): void{
		console.log("here")
		this.Socket = socketIo(SERVER_URL);
	}
	public sendMessage(message: Message): void{
		this.Socket.emit('message', message);
	}
	public onMessage(): Observable<Message>{
		return new Observable<Message>(Observer => {
			this.Socket.on('message', (data: Message) => Observer.next(data));
		});
	}

  constructor() { }

}
