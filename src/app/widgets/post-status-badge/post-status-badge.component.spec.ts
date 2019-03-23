import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStatusBadgeComponent } from './post-status-badge.component';

describe('PostStatusBadgeComponent', () => {
  let component: PostStatusBadgeComponent;
  let fixture: ComponentFixture<PostStatusBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostStatusBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
