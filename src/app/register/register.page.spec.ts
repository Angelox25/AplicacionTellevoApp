import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    //guardamos la instancia en componentes
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Prueba basica de carga del registro', () => {
    //esperamos que los componentes inicien correctamente
    expect(component).toBeTruthy();
  });
});
