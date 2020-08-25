import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest/rest.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subcategory } from 'src/interfaces/subcategoryInterfaces';
import { Thread } from 'src/interfaces/subcategoryInterfaces';

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

  constructor(private rest: RestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = Number(this.route.snapshot.paramMap.get('id'));

      this.rest.getSubcategory(this.id).subscribe((res) => {
        const subcategory: Subcategory = res.body.subcategory;

        this.name = subcategory.name;
        this.desc = subcategory.desc;
        this.threads = subcategory.threads;

        console.log(res.body.subcategory);
      });
    });
  }
}
