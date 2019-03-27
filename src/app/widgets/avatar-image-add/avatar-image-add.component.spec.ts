import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarImageAddComponent } from './avatar-image-add.component';

describe('AvatarImageAddComponent', () => {
  let component: AvatarImageAddComponent;
  let fixture: ComponentFixture<AvatarImageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarImageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarImageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
