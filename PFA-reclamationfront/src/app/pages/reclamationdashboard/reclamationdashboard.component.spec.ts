import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationdashboardComponent } from './reclamationdashboard.component';

describe('ReclamationdashboardComponent', () => {
  let component: ReclamationdashboardComponent;
  let fixture: ComponentFixture<ReclamationdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
