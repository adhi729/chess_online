import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { Message } from './class_defs/message_item'
import { SocketService } from './socket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  messages : Message[];
  messageContent : string;
  ioConnection: any;

  constructor(private socketService: SocketService){}

  ngOnInit(): void{
  	this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
});
}
   public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    console.log(message)
    this.socketService.sendMessage({data:message});
    console.log(this.socketService)
    this.messageContent = null;
}
}
