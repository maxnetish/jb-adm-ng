import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbCropperComponent } from './jb-cropper.component';

describe('JbCropperComponent', () => {
  let component: JbCropperComponent;
  let fixture: ComponentFixture<JbCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
