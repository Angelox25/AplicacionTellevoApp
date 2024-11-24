// Importamos herramientas para configurar y ejecutar pruebas unitarias en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importamos el componente que será probado.
import { ChonewviajePage } from './chonewviaje.page';
// Servicio de Angular que permite acceder a información de la ruta activa (parámetros, datos, etc.).
import { ActivatedRoute } from '@angular/router';
// Función de RxJS que crea un observable que emite un valor específico y luego se completa.
import { of } from 'rxjs';
// Módulo de almacenamiento de Ionic, utilizado para manejar datos localmente en la aplicación.
import { IonicStorageModule } from '@ionic/storage-angular';
// Servicio que provee acceso al almacenamiento local.
import { Storage } from '@ionic/storage-angular';
// Servicio personalizado que probablemente utiliza el `Storage` para manejar datos específicos.
import { StorageService } from '../storage.service';

  // Define un grupo de pruebas para el componente `ChonewviajePage`.
  describe('ChonewviajePage', () => {
  // Variable para almacenar la instancia del componente.
  let component: ChonewviajePage;
  // Variable para el "fixture", que representa un entorno de prueba para el componente.
  let fixture: ComponentFixture<ChonewviajePage>;

  beforeEach(async () => {
      // Configuramos el módulo de pruebas.
      await TestBed.configureTestingModule({

        // Inicializa el módulo de almacenamiento de Ionic para que `Storage` esté disponible.
        imports: [
        IonicStorageModule.forRoot(), 
      ],

      providers: [
        // Provee el servicio `Storage`, necesario para que el `StorageService` funcione correctamente.
        Storage, 
        // Provee el servicio personalizado `StorageService`, que probablemente usa `Storage`.
        StorageService, 
        {
          // Mockeamos el servicio `ActivatedRoute`, necesario para manejar rutas en Angular.
          provide: ActivatedRoute, 
          useValue: {
            // Simulamos `params` como un observable que emite `{ id: '123' }`, para pruebas relacionadas con parámetros de la ruta.
            params: of({ id: '123' }), 
            // Simulamos `queryParams` como un observable que emite `{ filter: 'active' }`.
            // Esto es útil si el componente utiliza parámetros de consulta en la URL.
            queryParams: of({ filter: 'active' }), 
          },
        },
      ],
    }).compileComponents();
    // Creamos el componente en el entorno de pruebas.
    fixture = TestBed.createComponent(ChonewviajePage);
    // Obtenemos la instancia del componente para interactuar con él durante las pruebas.
    component = fixture.componentInstance;
  });

  it('Prueba basica de componentes - Chonewviaje', () => {
    // Define un caso de prueba que verifica si el componente se crea correctamente.

    expect(component).toBeTruthy();
    // Comprueba que la instancia del componente no sea `null` o `undefined`.
  });
});
