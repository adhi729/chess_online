import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { TauntsComponent } from '../taunts/taunts.component';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  socket;
  player:string = "";
  constructor(private socketService: SocketService) { }
	setUser(id:number):void{
    	switch (id) {
      		case 1:
      			if(this.player != ""){break;}
        		this.player="white";
        		this.socketService.sendUsername(this.player);
        	break;
      
      		case 2:
      			if(this.player != ""){break;}
        		this.player="black";
        		this.socketService.sendUsername(this.player);
        	break;
    		}
  		}
  	makeMoveTemp():void{
  		console.log("hitted component service")
  		this.socketService.makeMove(this.player, "whiteblack", 1111);
  	}	
  ngOnInit() {
  }

}
