import { TestBed } from '@angular/core/testing'; // Importamos TestBed para configurar el entorno de pruebas
import { ChoferPage } from './chofer.page'; // Importamos el componente a probar
import { ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute para manejar rutas en pruebas
import { of } from 'rxjs'; // Importamos `of` para simular observables

describe('ChoferPage', () => {
  let component: ChoferPage; // Variable para la instancia del componente

  beforeEach(async () => {
    // Configuramos el entorno de pruebas antes de cada test
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute, // Proveemos un mock para ActivatedRoute
          useValue: {
            params: of({ id: '123' }), // Simulamos parámetros de la ruta con un observable
          },
        },
      ],
    }).compileComponents(); // Compilamos los componentes para las pruebas

    const fixture = TestBed.createComponent(ChoferPage); // Creamos una instancia del componente
    component = fixture.componentInstance; // Asignamos la instancia a nuestra variable
  });

  it('should create', () => {
    // Verificamos que el componente se haya creado correctamente
    expect(component).toBeTruthy(); // Comprueba que `component` no sea null o undefined
  });
});


