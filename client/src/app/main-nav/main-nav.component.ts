import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { config } from '../../config';

import { UserService, MyProfile } from '../services/user/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  title = config.name;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  myProfile: MyProfile = {
    logged: false,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: UserService
  ) {}

  ngOnInit(): void {
    this.auth.checkLoginStatus().subscribe((profile) => {
      this.myProfile = profile;
    });
  }
}
