import { TestBed } from '@angular/core/testing';

import { CursoContenidoService } from './curso-contenido.service';

describe('CursoContenidoService', () => {
  let service: CursoContenidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoContenidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
