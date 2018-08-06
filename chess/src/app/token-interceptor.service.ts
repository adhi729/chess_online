import { Injectable, Injector } from '@angular/core';
import { UserLoginService } from './user-login.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
  	let userauth = this.injector.get(UserLoginService);
  	let tokenizedReq = req.clone({
  		setHeaders: {
  			Authorization : `Bearer ${userauth.getToken()} `
  		}
  	})
  	return next.handle(tokenizedReq)
  }
}
