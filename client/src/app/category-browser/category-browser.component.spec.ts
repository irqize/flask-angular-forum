import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrowserComponent } from './category-browser.component';
import { HttpClientModule } from '@angular/common/http';

describe('CategoryBrowserComponent', () => {
  let component: CategoryBrowserComponent;
  let fixture: ComponentFixture<CategoryBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBrowserComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
