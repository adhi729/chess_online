import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Blog } from '../class_defs/blog_item';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog:Blog;
getBlog(id: string): void{
    this.blogservice.getBlog(id).subscribe(blog => this.blog = blog)
  }
  constructor(private route: ActivatedRoute,
  private location: Location,
  private blogservice: BlogsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getBlog(id);
  }

}
