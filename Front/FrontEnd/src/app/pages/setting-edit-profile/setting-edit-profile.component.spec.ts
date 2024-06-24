import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEditProfileComponent } from './setting-edit-profile.component';

describe('SettingEditProfileComponent', () => {
  let component: SettingEditProfileComponent;
  let fixture: ComponentFixture<SettingEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingEditProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
