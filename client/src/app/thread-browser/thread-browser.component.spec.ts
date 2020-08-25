import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadBrowserComponent } from './thread-browser.component';

describe('ThreadBrowserComponent', () => {
  let component: ThreadBrowserComponent;
  let fixture: ComponentFixture<ThreadBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadBrowserComponent ]
    })
    .compileComponents();
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
