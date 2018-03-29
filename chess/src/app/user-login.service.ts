import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserLoginService {
	private isUserLoggedIn: boolean = false;
	private userName: string = "poinku";

	getUserLoggedIn(): boolean{
		return this.isUserLoggedIn;
	}
	setUserLoggedIn(name: string): void{
		this.isUserLoggedIn = true;
		this.userName = name;	
	} 
	setUserLoggedOut(): boolean{
		this.isUserLoggedIn = false;
		this.userName = '';
		return true;
	}
	getUserName(): Observable<string>{
		console.log(this.userName,"lol")
		return of(this.userName);
	}
  constructor() { }

}
