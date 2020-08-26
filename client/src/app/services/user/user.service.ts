import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myProfile: MyProfile = {
    logged: false,
  };

  constructor(private http: HttpClient) {}

  checkLoginStatus(): Observable<MyProfile> {
    return new Observable((subscriber) => {
      this.http
        .get<MyProfile>(config.apiEndpoint + 'my_profile', {
          observe: 'response',
        })
        .subscribe((res) => {
          this.myProfile = res.body;

          subscriber.next(this.myProfile);
          subscriber.complete();
        });
    });
  }

  login(name: string, password: string): Observable<LoginResponse> {
    return new Observable((subscriber) => {
      this.http
        .post<LoginResponse>(
          config.apiEndpoint + 'login',
          { name, password },
          {
            observe: 'response',
          }
        )
        .subscribe((res) => {
          subscriber.next(res.body);
          subscriber.complete();
        });
    });
  }
}

export interface LoginResponse {
  error?: string;
  success?: string;
}

export interface MyProfile {
  logged: boolean;
  name?: string;
  id?: number;
  mail?: string;
  time_created?: number;
}
