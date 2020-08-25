import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { GetCategoriesResponse, Category, Subcategory } from '../categoryInterfaces'

@Component({
  selector: 'app-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.sass']
})
export class CategoryBrowserComponent implements OnInit {
  categories = []
  constructor(private rest: RestService) { }

  ngOnInit(): void {
    this.rest.getCategories().subscribe(res => {
      this.categories = res.body.categories
      console.log(this.categories);
    });
  }

}
