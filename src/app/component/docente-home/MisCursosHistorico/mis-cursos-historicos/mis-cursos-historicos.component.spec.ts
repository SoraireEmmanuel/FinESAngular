import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursosHistoricosComponent } from './mis-cursos-historicos.component';

describe('MisCursosHistoricosComponent', () => {
  let component: MisCursosHistoricosComponent;
  let fixture: ComponentFixture<MisCursosHistoricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCursosHistoricosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCursosHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
