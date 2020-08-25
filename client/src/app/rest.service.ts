import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { config } from '../config'
import { Observable } from 'rxjs';

import { GetCategoriesResponse, Category, Subcategory } from './categoryInterfaces'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  
  getCategories(): Observable<HttpResponse<GetCategoriesResponse>> {
    return this.http.get<GetCategoriesResponse>(config.apiEndpoint + 'api/get_categories', {observe: 'response'});
  }
  
  getThreads(subcategory: number) {
    return this.http.get(config.apiEndpoint + 'api/get_threads/' + subcategory);
  }
  
  getPosts(thread_id: number) {
    return this.http.get(config.apiEndpoint + 'api/get_posts/' + thread_id);
  }
}
