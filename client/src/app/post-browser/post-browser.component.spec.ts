import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBrowserComponent } from './post-browser.component';

describe('PostBrowserComponent', () => {
  let component: PostBrowserComponent;
  let fixture: ComponentFixture<PostBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBrowserComponent ]
    })
    .compileComponents();
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
