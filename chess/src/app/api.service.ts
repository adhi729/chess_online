import { Injectable } from '@angular/core';
import { Blog } from './class_defs/blog_item';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const api_url = "http://localhost:3000/"

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  public getAllBlogs():Observable<Blog>{
  	return this.http.get(api_url + "/blogs").map(
  		response => {
  			const blogs = response.json();

  			console.log(blogs);
  			return blogs.map((blog => new Blog()))
  		} )
  }

  public getBlog(id: string): void{

  }

  public getProfile(id: string): void{

  }

  public getLeaderBoard(id: string): void{

  }

  ngOnInit(){
  	this.getAllBlogs();
  }
}
