import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignardocenteComponent } from './asignardocente.component';

describe('AsignardocenteComponent', () => {
  let component: AsignardocenteComponent;
  let fixture: ComponentFixture<AsignardocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignardocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignardocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
