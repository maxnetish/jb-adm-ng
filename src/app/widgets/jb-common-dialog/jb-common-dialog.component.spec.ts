import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbCommonDialogComponent } from './jb-common-dialog.component';

describe('JbCommonDialogComponent', () => {
  let component: JbCommonDialogComponent;
  let fixture: ComponentFixture<JbCommonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbCommonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbCommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
