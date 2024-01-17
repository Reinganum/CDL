import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePacientesComponent } from './detalle-pacientes.component';

describe('DetallePacientesComponent', () => {
  let component: DetallePacientesComponent;
  let fixture: ComponentFixture<DetallePacientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePacientesComponent]
    });
    fixture = TestBed.createComponent(DetallePacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
