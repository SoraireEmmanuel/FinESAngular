import { TestBed } from '@angular/core/testing';

import { NuevaCuentaService } from './nueva-cuenta.service';

describe('NuevaCuentaService', () => {
  let service: NuevaCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
