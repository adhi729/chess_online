import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Login } from './class_defs/login_item'; 

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
	httpLoginOptions = {
  		headers: new HttpHeaders({ 'Content-Type': 'application/json'})
	};
	loginUser(userId: string, userPass: string): Observable<Login>{
		return this.http.post<Login>("http://localhost:3000/user/auth", {'úserId':userId, 'userPass': userPass} ).pipe(
			tap((login:Login) => console.log(login) ))
	}
  constructor(private http: HttpClient) { }

}
