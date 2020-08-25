import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest/rest.service';
import { ActivatedRoute } from '@angular/router';
import { Thread, Post } from '../../interfaces/threadInterfaces';

@Component({
  selector: 'app-post-browser',
  templateUrl: './post-browser.component.html',
  styleUrls: ['./post-browser.component.sass'],
})
export class PostBrowserComponent implements OnInit, Thread {
  constructor(private rest: RestService, private route: ActivatedRoute) {}
  id: number;
  sub_cat_id: number;
  author_id: number;
  title: string;
  time_created: number;
  content: string;
  author_name: string;
  is_admin: boolean;
  posts: Post[];

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.rest.getThread(this.id).subscribe((res) => {
      const thread: Thread = res.body.thread;

      this.author_id = thread.author_id;
      this.author_name = thread.author_name;
      this.content = thread.content;
      this.is_admin = thread.is_admin;
      this.posts = thread.posts;
      this.sub_cat_id = thread.sub_cat_id;
      this.time_created = thread.time_created;
      this.title = thread.title;
    });
  }
}
