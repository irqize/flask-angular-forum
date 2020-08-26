import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBrowserComponent } from './post-browser.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PostBrowserComponent', () => {
  let component: PostBrowserComponent;
  let fixture: ComponentFixture<PostBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostBrowserComponent],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
