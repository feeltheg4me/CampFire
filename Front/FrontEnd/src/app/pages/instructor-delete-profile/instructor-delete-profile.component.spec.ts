import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteProfileComponent } from './instructor-delete-profile.component';

describe('InstructorDeleteProfileComponent', () => {
  let component: InstructorDeleteProfileComponent;
  let fixture: ComponentFixture<InstructorDeleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDeleteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorDeleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
