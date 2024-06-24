import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltemplatebackComponent } from './alltemplateback.component';

describe('AlltemplatebackComponent', () => {
  let component: AlltemplatebackComponent;
  let fixture: ComponentFixture<AlltemplatebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltemplatebackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltemplatebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
