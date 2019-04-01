import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleImageFormControlChooserComponent } from './title-image-form-control-chooser.component';

describe('TitleImageFormControlChooserComponent', () => {
  let component: TitleImageFormControlChooserComponent;
  let fixture: ComponentFixture<TitleImageFormControlChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleImageFormControlChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleImageFormControlChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
