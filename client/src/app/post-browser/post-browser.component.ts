import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread, Post } from '../../interfaces/threadInterfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-browser',
  templateUrl: './post-browser.component.html',
  styleUrls: ['./post-browser.component.sass'],
})
export class PostBrowserComponent implements OnInit, Thread {
  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private user: UserService,
    private _snackBar: MatSnackBar
  ) {}
  id: number;
  sub_cat_id: number;
  author_id: number;
  title: string;
  time_created: number;
  content: string;
  author_name: string;
  is_admin: boolean;
  posts: Post[];

  showPopup: boolean = false;
  postFormGroup = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

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

  tryAddingPost() {
    if (!this.user.isLoggedIn()) {
      this._snackBar.open('You need to login to post.', null, {
        duration: 3000,
      });
      return;
    }
    this.showPopup = true;
  }

  addPost() {
    if (!this.user.isLoggedIn()) {
      return this._snackBar.open('You need to login to post.', null, {
        duration: 3000,
      });
    }

    const thread_id = this.id;
    const content = this.postFormGroup.get('content').value;

    this.user.addPost(thread_id, content).subscribe((_) => {
      this.showPopup = false;
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
    });
  }
}
