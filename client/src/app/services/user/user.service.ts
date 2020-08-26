import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myProfile: MyProfile = {
    logged: false,
  };

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.myProfile = parseJwt(localStorage.getItem('token'));
    }
  }

  isLoggedIn(): boolean {
    return this.myProfile.logged;
  }

  getProfile(): MyProfile {
    return this.myProfile;
  }

  getName(): string {
    return this.myProfile.name;
  }

  login(name: string, password: string): Observable<AuthResponse> {
    return new Observable((subscriber) => {
      this.http
        .post<TokenResponse>(
          config.apiEndpoint + 'login',
          { name, password },
          {
            observe: 'body',
          }
        )
        .subscribe(
          (res) => {
            localStorage.setItem('token', res.access_token);
            this.myProfile = parseJwt(res.access_token);

            subscriber.next({
              success: true,
            });
            subscriber.complete();
          },
          (error: HttpErrorResponse) => {
            subscriber.next({
              error: error.error.error,
            });
            subscriber.complete();
          }
        );
    });
  }

  register(
    name: string,
    mail: string,
    password: string
  ): Observable<AuthResponse> {
    return new Observable((subscriber) => {
      this.http
        .post<TokenResponse>(
          config.apiEndpoint + 'register',
          { name, mail, password },
          {
            observe: 'body',
          }
        )
        .subscribe(
          (res) => {
            localStorage.setItem('token', res.access_token);
            this.myProfile = parseJwt(res.access_token);

            subscriber.next({
              success: true,
            });
            subscriber.complete();
          },
          (error: HttpErrorResponse) => {
            subscriber.next({
              error: error.error.error,
            });
            subscriber.complete();
          }
        );
    });
  }

  logout() {
    this.myProfile = {
      logged: false,
    };

    localStorage.removeItem('token');
  }
}

function parseJwt(token: string): MyProfile {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload)['identity'];
}

interface TokenResponse {
  access_token: string;
}

export interface AuthResponse {
  error?: string;
  success?: boolean;
}

export interface MyProfile {
  logged: boolean;
  name?: string;
  id?: number;
  mail?: string;
  time_created?: number;
}
