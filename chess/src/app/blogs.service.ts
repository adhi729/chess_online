import { Injectable } from '@angular/core';
import { Blog } from './class_defs/blog_item';
import { BLOGS } from './class_defs/mock_blog_items';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogsService {

  constructor(private http: HttpClient) { }

	getBlogs(): Observable<Blog[]> {
		return this.http.get<Blog[]>("http://localhost:3000/blogs").pipe(
			catchError(this.handleError<Blog[]>('getBlogs', [])));
	};
  getBlog(): Observable<Blog> {
    console.log("in service")
    return this.http.get<Blog>("http://localhost:3000/blogs/1").pipe(
      catchError(this.handleError<Blog>('getBlog')));
  };

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}
}
