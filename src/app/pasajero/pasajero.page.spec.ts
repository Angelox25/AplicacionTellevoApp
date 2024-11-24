// Importaciones necesarias para las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas de prueba de Angular
import { PasajeroPage } from './pasajero.page'; // Componente que se está probando
import { ActivatedRoute } from '@angular/router'; // Servicio de rutas para gestionar parámetros de ruta

// Describe el conjunto de pruebas para el componente `PasajeroPage`
describe('PasajeroPage', () => {
  let component: PasajeroPage; // Instancia del componente bajo prueba
  let fixture: ComponentFixture<PasajeroPage>; // Maneja el entorno de pruebas del componente

  // Configuración del entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasajeroPage], // Importa el componente bajo prueba
      providers: [
        {
          provide: ActivatedRoute, // Proveedor para `ActivatedRoute`
          useValue: {
            snapshot: { // Simula un snapshot (instantánea) del estado de la ruta
              paramMap: { // Simula el acceso a parámetros de la ruta
                get: (key: string) => 'some-value', // Simula el retorno de un valor para cualquier clave
              },
            }, 
            
          },
        },
      ],
    }).compileComponents(); // Compila los componentes y módulos necesarios para las pruebas

    // Crea el componente y su entorno de pruebas
    fixture = TestBed.createComponent(PasajeroPage); // Crea la instancia del componente en pruebas
    component = fixture.componentInstance; // Obtiene la instancia del componente para interactuar con él
    fixture.detectChanges(); // Detecta cambios iniciales en el componente
  });

  // Prueba que verifica si el componente se carga correctamente
  it('Prueba local de carga de pasajero', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente no sea nula
  });
});

