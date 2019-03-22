import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePostEditComponent } from './page-post-edit.component';

describe('PagePostEditComponent', () => {
  let component: PagePostEditComponent;
  let fixture: ComponentFixture<PagePostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
