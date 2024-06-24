import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierreclamationComponent } from './modifierreclamation.component';

describe('ModifierreclamationComponent', () => {
  let component: ModifierreclamationComponent;
  let fixture: ComponentFixture<ModifierreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierreclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
