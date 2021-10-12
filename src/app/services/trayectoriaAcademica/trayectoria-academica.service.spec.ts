import { TestBed } from '@angular/core/testing';

import { TrayectoriaAcademicaService } from './trayectoria-academica.service';

describe('TrayectoriaAcademicaService', () => {
  let service: TrayectoriaAcademicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayectoriaAcademicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
