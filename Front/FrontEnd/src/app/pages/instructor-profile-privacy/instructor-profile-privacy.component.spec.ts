import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfilePrivacyComponent } from './instructor-profile-privacy.component';

describe('InstructorProfilePrivacyComponent', () => {
  let component: InstructorProfilePrivacyComponent;
  let fixture: ComponentFixture<InstructorProfilePrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorProfilePrivacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorProfilePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
