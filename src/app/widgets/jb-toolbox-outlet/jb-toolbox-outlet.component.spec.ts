import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbToolboxOutletComponent } from './jb-toolbox-outlet.component';

describe('JbToolboxOutletComponent', () => {
  let component: JbToolboxOutletComponent;
  let fixture: ComponentFixture<JbToolboxOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbToolboxOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbToolboxOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
