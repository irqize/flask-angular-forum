import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { config } from '../../config';

import { UserService, MyProfile } from '../services/user/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.sass'],
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

  showRegistrationPopup: boolean = false;
  showLoginPopup: boolean = false;

  loginFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.myProfile = this.auth.getProfile();
    }

    console.log(this.auth.isLoggedIn());
  }

  login() {
    this.auth
      .login(
        this.loginFormGroup.get('name').value,
        this.loginFormGroup.get('password').value
      )
      .subscribe((res) => {
        if (res.error) {
          this._snackBar.open(res.error, null, { duration: 3000 });
        }

        if (res.success) {
          this.showLoginPopup = false;
          this.myProfile = this.auth.getProfile();
          console.log(this.auth.getProfile());
          this._snackBar.open('Logged in successfuly.', null, {
            duration: 3000,
          });
        }
      });
  }

  logout() {
    this.myProfile = {
      logged: false,
    };

    this.auth.logout();
  }
}
