import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginPage } from './login.page';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

// Mock de `Router`, `UserService`, `StorageService`, y `ActivatedRoute`
// Crear espías para los servicios
// Espía de Router: simula el método `navigate` para verificar las navegaciones realizadas por el componente.
const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
// Espía de UserService: simula el método `iniciarSesion` para probar el flujo de inicio de sesión
// sin depender de la implementación real del servicio.
const userServiceSpy = jasmine.createSpyObj('UserService', ['iniciarSesion']);
// Stub de ActivatedRoute: simula un parámetro de consulta `username` en la URL,
// útil para probar cómo el componente maneja los parámetros de ruta.
const activatedRouteStub = {
  queryParams: of({ username: 'testuser' })// Simula parámetros de consulta
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, // Para formularios template-driven
        ReactiveFormsModule, // Para formularios reactivos
        IonicModule.forRoot(), // Configuración de Ionic para pruebas
        LoginPage // Declara el componente bajo prueba
      ],
      providers: [
        { provide: Router, useValue: routerSpy }, // Usa el mock del Router
        { provide: UserService, useValue: userServiceSpy }, // Usa el mock del UserService
        { provide: ActivatedRoute, useValue: activatedRouteStub }, // Stub para ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage); // Crea la instancia del componente
    component = fixture.componentInstance; // Obtiene el componente
    fixture.detectChanges(); // Aplica los cambios iniciales
  });

  it('P1: Existencia de la página Login', () => {
    expect(component).toBeTruthy();
  });

  it('P2: Ingreso de username, el formulario debe ser inválido', () => {
    const usernameControl = component.loginForm.get('username');
    usernameControl?.setValue('12345678');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('P3: Formulario válido', () => {
    const usernameControl = component.loginForm.get('username');
    usernameControl?.setValue('testuser');

    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('1234');

    expect(component.loginForm.valid).toBeTrue();
  });

  it('P4: Prueba del botón de ingreso', async () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');
    usernameControl?.setValue('testuser');
    passwordControl?.setValue('1234');

    userServiceSpy.iniciarSesion.and.returnValue(Promise.resolve(true));
    await component.onLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['home'], { queryParams: { username: 'testuser' } });
  });


});
