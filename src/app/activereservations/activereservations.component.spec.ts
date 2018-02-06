import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivereservationsComponent } from './activereservations.component';

describe('ActivereservationsComponent', () => {
  let component: ActivereservationsComponent;
  let fixture: ComponentFixture<ActivereservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivereservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivereservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
