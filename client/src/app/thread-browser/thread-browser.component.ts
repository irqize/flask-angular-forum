import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subcategory, Thread } from '../../interfaces/subcategoryInterfaces';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-thread-browser',
  templateUrl: './thread-browser.component.html',
  styleUrls: ['./thread-browser.component.sass'],
})
export class ThreadBrowserComponent implements OnInit, Subcategory {
  id: number;
  name: string = '';
  desc: string = '';
  threads: Thread[] = [];

  showPopup: boolean = false;

  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private user: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  threadFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.rest.getSubcategory(this.id).subscribe((res) => {
      const subcategory: Subcategory = res.body.subcategory;

      this.name = subcategory.name;
      this.desc = subcategory.desc;
      this.threads = subcategory.threads;
    });
  }

  tryAddingThread() {
    if (!this.user.isLoggedIn()) {
      this._snackBar.open('You need to login to post.', null, {
        duration: 3000,
      });
      return;
    }
    this.showPopup = true;
  }

  addThread() {
    const sub_cat_id = this.id;
    const title = this.threadFormGroup.get('title').value;
    const content = this.threadFormGroup.get('content').value;

    this.user.addThread(title, sub_cat_id, content).subscribe((id) => {
      this.showPopup = false;

      this.router.navigate(['/thread', id]);
    });
  }
}
