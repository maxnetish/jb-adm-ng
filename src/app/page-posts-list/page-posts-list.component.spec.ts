import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePostsListComponent } from './page-posts-list.component';

describe('PagePostsListComponent', () => {
  let component: PagePostsListComponent;
  let fixture: ComponentFixture<PagePostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
