import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneaTuViajeComponent } from './planea-tu-viaje.component';

describe('PlaneaTuViajeComponent', () => {
  let component: PlaneaTuViajeComponent;
  let fixture: ComponentFixture<PlaneaTuViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneaTuViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneaTuViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
