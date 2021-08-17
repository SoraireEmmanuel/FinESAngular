import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayectoriaacademicaComponent } from './trayectoriaacademica.component';

describe('TrayectoriaacademicaComponent', () => {
  let component: TrayectoriaacademicaComponent;
  let fixture: ComponentFixture<TrayectoriaacademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrayectoriaacademicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrayectoriaacademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
