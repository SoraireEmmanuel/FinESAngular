import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarcursoComponent } from './administrarcurso.component';

describe('AdministrarcursoComponent', () => {
  let component: AdministrarcursoComponent;
  let fixture: ComponentFixture<AdministrarcursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarcursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
