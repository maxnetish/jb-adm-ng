import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsFormControlComponent } from './tags-form-control.component';

describe('TagsFormControlComponent', () => {
  let component: TagsFormControlComponent;
  let fixture: ComponentFixture<TagsFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
