import { Injectable } from '@angular/core';

@Injectable()
export class UserLoginService {
	private isUserLoggedIn: boolean = false;
	private userName: string;

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
	getUserName(): string{
		return this.userName;
	}
  constructor() { }

}
