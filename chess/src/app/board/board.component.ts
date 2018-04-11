import { Component, OnInit, Input } from '@angular/core';
import { board_square } from '../class_defs/board_square_item';
import { boardIniState } from '../class_defs/board_state';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})


export class BoardComponent implements OnInit {
	@Input() profile: string;
	recievedMove: number;
getMoves(): void{
  	this.socketService.sendRecievedMoves().subscribe(recievedMove => this.recievedMove = recievedMove);
  }
	squares: board_square[] = [] ;
	orient: number = window.innerWidth / window.innerHeight;
	square_width: number;
	setBoardSize(): void{
		this.square_width = window.innerHeight/10;
	}

	customStyle(square: board_square): any {
		this.setBoardSize();
		let tempColor = (square.id.x+square.id.y)%2 ? true : false;
		if(this.profile == "white"){
		tempColor = (!tempColor)? true: false;
		}
		let tempActive = (square.status == "active")? true : false;
		return {
			'background-color' : tempColor ? 'white' : 'lightgreen',
			'width': String(this.square_width)+'px',
			'height': String(this.square_width)+'px',
			'top': String(square.id.x*this.square_width)+'px',
			'left': String(square.id.y*this.square_width)+'px',
			'position': 'absolute',
			'overflow': 'hidden',
			'box-shadow': tempActive? 'inset 0px 0px 5px 5px black': 'none',
		}
	}
	getID(square: board_square): string{
		let id = String(square.id.y)+String(square.id.x);
		return id
	}
	addSquares(squares: board_square[]): void{
		if (sessionStorage.length > 0) {
			this.squares = JSON.parse(sessionStorage.getItem('key')) ;
		}else {
			this.squares = squares;
		}
	};
	private matchId: string = "";
	private kingPosition: {x:number, y:number} = {x:8,y:5};
	private moveCount :{king: boolean; rook_right: boolean; rook_left: boolean;} = {king: false, rook_left: false, rook_right: false};
	private makeMoveSquare : board_square = null;
	private activeSquares: number[] = [];
	private piecesTake = [[],[]];
	private findMoves(x: number,y: number,piece:string): void {
		
		let index_id :{x_id : number; y_id: number} = {x_id : x, y_id : y};
		switch (piece.slice(0,-9)) {
			case "pawn":
				if (x == 7) {
					if (this.squares[x*8 + y - 17].piece == "" ){
						this.activeSquares.push(x*8+y-17)
					}
					if (this.squares[x*8 + y - 25].piece == "" ){
						this.activeSquares.push(x*8+y-25);
					}
					
				} else {
					if (this.squares[x*8 + y - 17].piece == "" ){
						this.activeSquares.push(x*8+y-17)
					}

				}
				if(this.squares[x*8 + y - 16].piece != "" && this.squares[x*8 + y - 16].piece.slice(-8,-3) != this.profile){
						if(y != 8 ){this.activeSquares.push(x*8 + y - 16)}
					}
				if(this.squares[x*8 + y - 18].piece != "" && this.squares[x*8 + y - 18].piece.slice(-8,-3) != this.profile){
						if(y != 1 ){this.activeSquares.push(x*8 + y - 18)}
					}
				break;
			
			case "rook":
				if (index_id.x_id - 1 > 0){
					for (var i = index_id.x_id - 1; i > 0; i--) {
						if (this.squares[i*8 + index_id.y_id - 9].piece == "" ){
							this.activeSquares.push(i*8 + index_id.y_id - 9)
						} else {
							if (piece.slice(-9,-3) != this.squares[i*8 + index_id.y_id - 9].piece.slice(-9,-3) ){
								this.activeSquares.push(i*8 + index_id.y_id - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1< 7){
					for (var i = index_id.x_id + 1; i <= 8; i++) {
						if (this.squares[i*8 + index_id.y_id - 9].piece == "" ){
							this.activeSquares.push(i*8 + index_id.y_id - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + index_id.y_id - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + index_id.y_id - 9)
							}
							break;
						}
					}
				}
				if (index_id.y_id - 1< 7){
					for (var i = index_id.y_id + 1; i <= 8; i++) {
						if (this.squares[index_id.x_id*8 + i - 9].piece == "" ){
							this.activeSquares.push(index_id.x_id*8 + i - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[index_id.x_id*8 + i - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(index_id.x_id*8 + i - 9)
							}
							break;
						}
					}
				}
				if (index_id.y_id - 1 > 0){
					for (var i = index_id.y_id - 1; i > 0; i--) {
						if (this.squares[index_id.x_id*8 + i - 9].piece == "" ){
							this.activeSquares.push(index_id.x_id*8 + i - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[index_id.x_id*8 + i - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(index_id.x_id*8 + i - 9)
							}
							break;
						}
					}
				}
				break;

			case "bishop":
				if (index_id.x_id - 1 > 0 && index_id.y_id - 1 > 0){
					for (let i = index_id.x_id - 1,j = index_id.y_id -1; i>0 && j>0; i--,j--){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 < 7 && index_id.y_id - 1 < 7){
					for (let i = index_id.x_id + 1,j = index_id.y_id + 1; i<=8 && j<=8; i++,j++){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 > 0 && index_id.y_id - 1 < 7){
					for (let i = index_id.x_id - 1,j = index_id.y_id + 1; i>0 && j<=8; i--,j++){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 < 7 && index_id.y_id - 1 > 0){
					for (let i = index_id.x_id + 1,j = index_id.y_id - 1; i<=8 && j>0; i++,j--){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				break;
			case "horse":
				let possible: {x_id : number; y_id: number}[] = [
					{x_id : x+1, y_id : y+2},
					{x_id : x+1, y_id : y-2},
					{x_id : x-1, y_id : y+2},
					{x_id : x-1, y_id : y-2},
					{x_id : x+2, y_id : y+1},
					{x_id : x+2, y_id : y-1},
					{x_id : x-2, y_id : y+1},
					{x_id : x-2, y_id : y-1}];
				for(let poss of possible) {
					if(poss.x_id>0&&poss.x_id<=8&&poss.y_id>0&&poss.y_id<=8){
						if (this.squares[poss.x_id*8+poss.y_id-9].piece == "" ){
							this.activeSquares.push(poss.x_id*8+poss.y_id-9)
						} else {
							if (piece.slice(-8,-3) != this.squares[poss.x_id*8+poss.y_id-9].piece.slice(-8,-3) ){
								this.activeSquares.push(poss.x_id*8+poss.y_id-9)
							}
						}
					}
				}
				break;	
			case "queen":
				if (index_id.x_id - 1 > 0 && index_id.y_id - 1 > 0){
					for (let i = index_id.x_id - 1,j = index_id.y_id -1; i>0 && j>0; i--,j--){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 < 7 && index_id.y_id - 1 < 7){
					for (let i = index_id.x_id + 1,j = index_id.y_id + 1; i<=8 && j<=8; i++,j++){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 > 0 && index_id.y_id - 1 < 7){
					for (let i = index_id.x_id - 1,j = index_id.y_id + 1; i>0 && j<=8; i--,j++){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 < 7 && index_id.y_id - 1 > 0){
					for (let i = index_id.x_id + 1,j = index_id.y_id - 1; i<=8 && j>0; i++,j--){
						if (this.squares[i*8 + j - 9].piece == "" ){
							this.activeSquares.push(i*8 + j - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + j - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + j - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 > 0){
					for (var i = index_id.x_id - 1; i > 0; i--) {
						if (this.squares[i*8 + index_id.y_id - 9].piece == "" ){
							this.activeSquares.push(i*8 + index_id.y_id - 9)
						} else {
							if (piece.slice(-9,-3) != this.squares[i*8 + index_id.y_id - 9].piece.slice(-9,-3) ){
								this.activeSquares.push(i*8 + index_id.y_id - 9)
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1< 7){
					for (var i = index_id.x_id + 1; i <= 8; i++) {
						if (this.squares[i*8 + index_id.y_id - 9].piece == "" ){
							this.activeSquares.push(i*8 + index_id.y_id - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[i*8 + index_id.y_id - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(i*8 + index_id.y_id - 9)
							}
							break;
						}
					}
				}
				if (index_id.y_id - 1< 7){
					for (var i = index_id.y_id + 1; i <= 8; i++) {
						if (this.squares[index_id.x_id*8 + i - 9].piece == "" ){
							this.activeSquares.push(index_id.x_id*8 + i - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[index_id.x_id*8 + i - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(index_id.x_id*8 + i - 9)
							}
							break;
						}
					}
				}
				if (index_id.y_id - 1 > 0){
					for (var i = index_id.y_id - 1; i > 0; i--) {
						if (this.squares[index_id.x_id*8 + i - 9].piece == "" ){
							this.activeSquares.push(index_id.x_id*8 + i - 9)
						} else {
							if (piece.slice(-8,-3) != this.squares[index_id.x_id*8 + i - 9].piece.slice(-8,-3) ){
								this.activeSquares.push(index_id.x_id*8 + i - 9)
							}
							break;
						}
					}
				}
				break;
			case "king":
				let possibles: {x_id : number; y_id: number}[] = [
					{x_id : x+1, y_id : y+1},
					{x_id : x+1, y_id : y},
					{x_id : x+1, y_id : y-1},
					{x_id : x, y_id : y+1},
					{x_id : x, y_id : y-1},
					{x_id : x-1, y_id : y+1},
					{x_id : x-1, y_id : y},
					{x_id : x-1, y_id : y-1}];
				for(let poss of possibles) {
					if(poss.x_id>0&&poss.x_id<=8&&poss.y_id>0&&poss.y_id<=8){						
						if(!this.checkCheck(poss.x_id,poss.y_id)){
							console.log("kings moves:", poss.x_id,poss.y_id)
							if (this.squares[poss.x_id*8+poss.y_id-9].piece == "" ){
								this.activeSquares.push(poss.x_id*8+poss.y_id-9)						
							} else {
								if (piece.slice(-8,-3) != this.squares[poss.x_id*8+poss.y_id-9].piece.slice(-8,-3) ){
									this.activeSquares.push(poss.x_id*8+poss.y_id-9)
								}
							}
						}	
					}
				}
				break;

		}
	}

	private checkCheck(x: number,y: number): boolean{
		//adding and removing king
		this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "";
		//
		let index_id :{x_id : number; y_id: number} = {x_id : x, y_id : y};
				if (index_id.x_id - 1 > 0 && index_id.y_id - 1 > 0){
					for (let i = index_id.x_id - 1,j = index_id.y_id -1; i>0 && j>0; i--,j--){
						if (this.squares[i*8 + j - 9].piece != "" ){
							if(this.profile != this.squares[i*8+j-9].piece.slice(-8,-3)){
								if(this.squares[i*8+j-9].piece.slice(0,-9) == "queen" || this.squares[i*8+j-9].piece.slice(0,-9) == "bishop"  ){
									console.log(i,j,this.squares[i*8+j-9].piece,"check from bishop/queen")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 < 7 && index_id.y_id - 1 < 7){
					for (let i = index_id.x_id + 1,j = index_id.y_id + 1; i<=8 && j<=8; i++,j++){
						if (this.squares[i*8 + j - 9].piece != "" ){
							if(this.profile != this.squares[i*8+j-9].piece.slice(-8,-3)){
								if(this.squares[i*8+j-9].piece.slice(0,-9) == "queen" || this.squares[i*8+j-9].piece.slice(0,-9) == "bishop"  ){
									console.log(i,j,this.squares[i*8+j-9].piece,"check from bishop/queen")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}	
				if (index_id.x_id - 1 > 0 && index_id.y_id - 1 < 7){
					for (let i = index_id.x_id - 1,j = index_id.y_id + 1; i>0 && j<=8; i--,j++){
						if (this.squares[i*8 + j - 9].piece != "" ){
							if(this.profile != this.squares[i*8+j-9].piece.slice(-8,-3)){
								if(this.squares[i*8+j-9].piece.slice(0,-9) == "queen" || this.squares[i*8+j-9].piece.slice(0,-9) == "bishop"  ){
									console.log(i,j,this.squares[i*8+j-9].piece,"check from bishop/queen")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 < 7 && index_id.y_id - 1 > 0){
					for (let i = index_id.x_id + 1,j = index_id.y_id - 1; i<=8 && j>0; i++,j--){
						if (this.squares[i*8 + j - 9].piece != "" ){
							if(this.profile != this.squares[i*8+j-9].piece.slice(-8,-3)){
								if(this.squares[i*8+j-9].piece.slice(0,-9) == "queen" ||this.squares[i*8+j-9].piece.slice(0,-9) == "bishop"  ){
									console.log(i,j,this.squares[i*8+j-9].piece,"check from bishop/queen")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1 > 0){
					for (var i = index_id.x_id - 1; i > 0; i--) {
						if (this.squares[i*8 + index_id.y_id - 9].piece != "" ){
							if(this.profile != this.squares[i*8+index_id.y_id-9].piece.slice(-8,-3)){
								if(this.squares[i*8+index_id.y_id-9].piece.slice(0,-9) == "queen" ||this.squares[i*8+index_id.y_id-9].piece.slice(0,-9) == "rook" ){
									console.log(i,index_id.y_id,"check from rook/queen_01")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				if (index_id.x_id - 1< 7){
					for (var i = index_id.x_id + 1; i <= 8; i++) {
						if (this.squares[i*8 + index_id.y_id - 9].piece != "" ){
							if(this.profile != this.squares[i*8+index_id.y_id-9].piece.slice(-8,-3)){
								if(this.squares[i*8+index_id.y_id-9].piece.slice(0,-9) == "queen" ||this.squares[i*8+index_id.y_id-9].piece.slice(0,-9) == "rook" ){
									console.log(i,index_id.y_id,"check from rook/queen_01")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				if (index_id.y_id - 1< 7){
					for (var j = index_id.y_id + 1; j <= 8; j++) {
						if (this.squares[index_id.x_id*8 + j - 9].piece != "" ){
							if(this.profile != this.squares[index_id.x_id*8+j-9].piece.slice(-8,-3)){
								if(this.squares[index_id.x_id*8+j-9].piece.slice(0,-9) == "queen" ||this.squares[index_id.x_id*8+j-9].piece.slice(0,-9) == "rook" ){
									console.log(index_id.x_id,j,"check from rook/queen_03")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				if (index_id.y_id - 1 > 0){
					for (var j = index_id.y_id - 1; j > 0; j--) {
						if (this.squares[index_id.x_id*8 + j - 9].piece != "" ){
							if(this.profile != this.squares[index_id.x_id*8+j-9].piece.slice(-8,-3)){
								if(this.squares[index_id.x_id*8+j-9].piece.slice(0,-9) == "queen" ||this.squares[index_id.x_id*8+j-9].piece.slice(0,-9) == "rook" ){
									console.log(index_id.x_id,j,"check from rook/queen_03")
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
									return true;
								}
							}
							break;
						}
					}
				}
				//horse moves check validation:
				let possible: {x_id : number; y_id: number}[] = [
					{x_id : x+1, y_id : y+2},
					{x_id : x+1, y_id : y-2},
					{x_id : x-1, y_id : y+2},
					{x_id : x-1, y_id : y-2},
					{x_id : x+2, y_id : y+1},
					{x_id : x+2, y_id : y-1},
					{x_id : x-2, y_id : y+1},
					{x_id : x-2, y_id : y-1}];
				for(let poss of possible) {
					if(poss.x_id>0&&poss.x_id<=8&&poss.y_id>0&&poss.y_id<=8){
						if (this.squares[poss.x_id*8+poss.y_id-9].piece.split("_")[0] == "horse" && this.squares[poss.x_id*8+poss.y_id-9].piece.split("_")[1] != this.profile ){
							
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
							return true;
						} 
					}
				}
				//king moves check validation:
				let possibles: {x_id : number; y_id: number}[] = [
					{x_id : x+1, y_id : y+1},
					{x_id : x+1, y_id : y},
					{x_id : x+1, y_id : y-1},
					{x_id : x, y_id : y+1},
					{x_id : x, y_id : y-1},
					{x_id : x-1, y_id : y+1},
					{x_id : x-1, y_id : y},
					{x_id : x-1, y_id : y-1}];
				for(let poss of possibles) {
					if(poss.x_id>0&&poss.x_id<=8&&poss.y_id>0&&poss.y_id<=8){
						if (this.squares[poss.x_id*8+poss.y_id-9].piece.split("_")[0] == "king" && this.squares[poss.x_id*8+poss.y_id-9].piece.split("_")[1] != this.profile ){
								console.log(this.squares[poss.x_id*8+poss.y_id-9].piece.split("_")[0])
							
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//
							return true;						
						}
					}
				}
				// if(x*8+y-16>=0){
				// if(this.squares[x*8+y-16].piece.split("_")[0] == "pawn" && this.squares[x*8+y-16].piece.split("_")[1] != this.profile ){
					
				// 					//
				// 					this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
				// 					//
				// 	return true;
				// }}
				// if(x*8+y-18>=0){
				// if(this.squares[x*8+y-18].piece.split("_")[0] == "pawn" && this.squares[x*8+y-18].piece.split("_")[1] != this.profile ){
					
				// 					//
				// 					this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
				// 					//
				// 	return true;
				// }}
									//
									this.squares[this.kingPosition.x*8+this.kingPosition.y - 9].piece = "king_"+this.profile+"_00";
									//

		return false;
	}

	private commitMove(id_1: number, id_2: number): boolean{
		console.log(this.kingPosition);
		
		if(this.squares[id_1].piece.slice(0,-9) == "king"){
			let temp = {x:(id_2 - id_2%8)/8 +1 ,y:id_2%8 +1};
			// if(this.checkCheck(temp.x,temp.y)){
			// 	return false;		
			// }
			this.kingPosition = {x:temp.x ,y:temp.y};
			this.moveCount.king	=  true;
		}
		if (this.squares[id_2].piece.length != 0 ){
			this.piecesTake[0].push(this.squares[id_2].piece);
			this.squares[id_2].piece = this.squares[id_1].piece;
			this.squares[id_1].piece = "";
			if (this.checkCheck(this.kingPosition.x, this.kingPosition.y)){
				this.squares[id_1].piece = this.squares[id_2].piece;
				this.squares[id_2].piece = this.piecesTake[0][-1];
				this.piecesTake[0].pop();
				return false;
			}
		} else{
			this.squares[id_2].piece = this.squares[id_1].piece;
			this.squares[id_1].piece = "";
			if (this.checkCheck(this.kingPosition.x, this.kingPosition.y)){
				this.squares[id_1].piece = this.squares[id_2].piece;
				this.squares[id_2].piece = "";
				return false;
			}
		}
		if(this.checkCheck(this.kingPosition.x,this.kingPosition.y)){
			return false;
		}
		this.socketService.makeMove(this.profile, "whiteblack", id_1+id_2);
		return true;
		
	}
	changeStatus(id: number): void{
		if( this.squares[id].status.length == 0){
			this.squares[id].status = "active";
		} else {
			this.squares[id].status = "";
		}
	}

	moveMe(square: board_square): void{
		if (this.makeMoveSquare == null) {
			if(square.piece.slice(-8,-3)!= this.profile){
				return;
			}
			this.makeMoveSquare = square;
			square.status = "active";
			this.findMoves(square.id.x, square.id.y, square.piece);
			for (let key of this.activeSquares)	{
			this.changeStatus(key)
			}
			
		} else{
			if (square !=  this.makeMoveSquare && square.status == "active" ){
				//this.squares[square.id.x*8 + square.id.y-9].piece = this.squares[this.makeMoveSquare.id.x*8+this.makeMoveSquare.id.y - 9].piece;
				//this.squares[this.makeMoveSquare.id.x*8+this.makeMoveSquare.id.y - 9].piece = "";
				let hello = this.commitMove(this.makeMoveSquare.id.x*8+this.makeMoveSquare.id.y - 9,square.id.x*8 + square.id.y-9);
				if (hello == false){alert("check")} 
			};
			this.squares[this.makeMoveSquare.id.x*8+this.makeMoveSquare.id.y - 9].status = "" ;
			for (let key of this.activeSquares)	{
			this.changeStatus(key);
			}
			this.makeMoveSquare = null;
			this.activeSquares= [];
		};
		//sessionStorage.setItem('key',JSON.stringify(this.squares));
		
	}
	getPiece(x :string): string{
		return this.squares[parseInt(x.slice(1,2))*8 + parseInt(x.slice(0,1))-9].piece.slice(0,-3);
		
	}; 
  constructor(private socketService: SocketService) { }

  ngOnInit() {
  	let	boards: board_square[] = [];
	let tempArray: board_square[]=[];
	/*for (let i = 1; i <9 ; i++) {
		for (let j = 1; j < 9; j++) {
			let new_square: board_square = {
				id: {x:i,y:j},
				piece: "queen_white"
			};
			boards.push(new_square);
		}
	}*/
	boards = boardIniState;
	switch (this.profile) {
		case "white":
			for (var i = 0; i < boards.length; i++) {
				if(boards[i].piece == "") {
					continue;
				}
				let temp = (boards[i].piece.slice(-8,-3)=="black")? "_white_": "_black_";
				boards[i].piece = boards[i].piece.split("_")[0] + temp + boards[i].piece.split("_")[2];
			}
			// for (var i = boards.length -1; i >= 0; i--) {
			// 	tempArray.push(boards[i]);
			// }
			this.addSquares(boards);
			break;
		
		case "black":
			this.addSquares(boards);
			break;
	}
	this.getMoves();
  }
}
