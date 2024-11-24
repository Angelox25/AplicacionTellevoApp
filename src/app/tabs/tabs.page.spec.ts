import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsPage } from './tabs.page';
// Importamos el módulo de almacenamiento de Ionic, necesario para inicializar el servicio `Storage`.
import { IonicStorageModule } from '@ionic/storage-angular';
// Importamos el servicio `Storage`, que se utiliza para manejar almacenamiento en la aplicación.
import { Storage } from '@ionic/storage-angular';
// Importamos un servicio personalizado (`StorageService`) que probablemente interactúa con el `Storage`.
import { StorageService } from '../storage.service';
// Importamos `ActivatedRoute` de Angular Router, para simular rutas y parámetros en el entorno de pruebas.
import { ActivatedRoute } from '@angular/router';
// Importamos `of` de RxJS para crear observables en las pruebas.
import { of } from 'rxjs';

describe('TabsPage', () => {
  let component: TabsPage; // Instancia del componente bajo prueba.
  let fixture: ComponentFixture<TabsPage>; // Manejador del entorno de pruebas del componente.

  beforeEach(async () => {
    // Configuramos el entorno de pruebas.
    await TestBed.configureTestingModule({
      imports: [
        TabsPage, // Se incluye el componente bajo prueba.
        IonicStorageModule.forRoot(), // Inicializa el servicio `Storage` para que funcione en las pruebas.
      ],
      providers: [
        {
          provide: ActivatedRoute, // Mock para `ActivatedRoute`.
          useValue: {
            params: of({}), // Simula parámetros de la ruta.
            queryParams: of({}), // Simula parámetros de consulta.
          },
        },
        Storage, // Proveemos el servicio `Storage` para que sea inyectado en el componente o servicios relacionados.
        StorageService, // Proveemos el servicio `StorageService`, ya que puede ser utilizado por el componente.
      ],
    }).compileComponents(); // Compila los componentes necesarios para las pruebas.

    // Creamos una instancia del componente bajo prueba.
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance; // Obtenemos la instancia del componente.
    fixture.detectChanges(); // Detectamos los cambios iniciales en el componente.
  });

  // Prueba básica: verifica que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Confirma que la instancia del componente no sea nula.
  });
});