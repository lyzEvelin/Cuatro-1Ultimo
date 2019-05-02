import { TestBed } from '@angular/core/testing';

import { DatosAbiertosService } from './datos-abiertos.service';

describe('DatosAbiertosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosAbiertosService = TestBed.get(DatosAbiertosService);
    expect(service).toBeTruthy();
  });
});
