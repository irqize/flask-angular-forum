import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadBrowserComponent } from './thread-browser.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ThreadBrowserComponent', () => {
  let component: ThreadBrowserComponent;
  let fixture: ComponentFixture<ThreadBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadBrowserComponent],
      imports: [HttpClientModule, AppRoutingModule, MatSnackBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
