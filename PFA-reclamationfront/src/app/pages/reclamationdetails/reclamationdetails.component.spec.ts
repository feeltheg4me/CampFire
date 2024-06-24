import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationdetailsComponent } from './reclamationdetails.component';

describe('ReclamationdetailsComponent', () => {
  let component: ReclamationdetailsComponent;
  let fixture: ComponentFixture<ReclamationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
