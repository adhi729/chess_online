import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Blog } from '../class_defs/blog_item';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
	blogs: Blog[];
  constructor(private blogservice: BlogsService,private route: ActivatedRoute, private location: Location) { }
getBlogs(): void{
  	this.blogservice.getBlogs().subscribe(blogs => this.blogs = blogs);
  	console.log("helllo")
  }
  ngOnInit() {
  	//const id = this.route.snapshot.paramMap.get('id');
  	//console.log(id)
  	this.getBlogs();
  }

}
