import { Injectable } from '@angular/core';
import { Blog } from './class_defs/blog_item';
import { BLOGS } from './class_defs/mock_blog_items';
//import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';


@Injectable()
export class BlogsService {
	getBlogs(): Observable<Blog[]> {
		return of(BLOGS);
	}
// getBlogs(): Observable<Blog[]> {
// 		return this.http.get("http://localhost:3000/blogs").map(
// 			Response => {const blog = Response.json();
// 				return blog.map((blog) => new Blog())}).catch(this.handleError)
// }
// private handleError (error: Response | any) {
//   console.error('ApiService::handleError', error);
//   return Observable.throw(error);
// }
// constructor(private http: Http) { }
  constructor() { }

}
