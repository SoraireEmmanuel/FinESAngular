import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursosActivosComponent } from './mis-cursos-activos.component';

describe('MisCursosActivosComponent', () => {
  let component: MisCursosActivosComponent;
  let fixture: ComponentFixture<MisCursosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCursosActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCursosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
