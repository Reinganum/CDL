import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponerComponent } from './componer.component';

describe('ComponerComponent', () => {
  let component: ComponerComponent;
  let fixture: ComponentFixture<ComponerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponerComponent]
    });
    fixture = TestBed.createComponent(ComponerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
