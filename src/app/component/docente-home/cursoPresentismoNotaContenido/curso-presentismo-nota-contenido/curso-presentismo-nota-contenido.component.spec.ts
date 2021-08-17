import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPresentismoNotaContenidoComponent } from './curso-presentismo-nota-contenido.component';

describe('CursoPresentismoNotaContenidoComponent', () => {
  let component: CursoPresentismoNotaContenidoComponent;
  let fixture: ComponentFixture<CursoPresentismoNotaContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoPresentismoNotaContenidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPresentismoNotaContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
