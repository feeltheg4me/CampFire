import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererreclamationComponent } from './gererreclamation.component';

describe('GererreclamationComponent', () => {
  let component: GererreclamationComponent;
  let fixture: ComponentFixture<GererreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererreclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
