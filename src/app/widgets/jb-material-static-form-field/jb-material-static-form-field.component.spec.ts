import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbMaterialStaticFormFieldComponent } from './jb-material-static-form-field.component';

describe('JbMaterialStaticFormFieldComponent', () => {
  let component: JbMaterialStaticFormFieldComponent;
  let fixture: ComponentFixture<JbMaterialStaticFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbMaterialStaticFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbMaterialStaticFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
