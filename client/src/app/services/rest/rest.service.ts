import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { config } from '../../../config';
import { Observable } from 'rxjs';

import { GetCategoriesResponse } from '../../../interfaces/categoryInterfaces';
import { GetSubcategoryResponse } from '../../../interfaces/subcategoryInterfaces';
import { GetThreadResponse } from '../../../interfaces/threadInterfaces';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<HttpResponse<GetCategoriesResponse>> {
    return this.http.get<GetCategoriesResponse>(
      config.apiEndpoint + 'api/get_categories',
      { observe: 'response' }
    );
  }

  getSubcategory(
    subcategory: number
  ): Observable<HttpResponse<GetSubcategoryResponse>> {
    return this.http.get<GetSubcategoryResponse>(
      config.apiEndpoint + 'api/get_subcategory/' + subcategory,
      { observe: 'response' }
    );
  }

  getThread(thread_id: number): Observable<HttpResponse<GetThreadResponse>> {
    return this.http.get<GetThreadResponse>(
      config.apiEndpoint + 'api/get_thread/' + thread_id,
      { observe: 'response' }
    );
  }
}
