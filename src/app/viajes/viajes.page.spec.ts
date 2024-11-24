import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesPage } from './viajes.page';
// Importamos el módulo de almacenamiento de Ionic, necesario para inicializar el servicio `Storage`.
import { IonicStorageModule } from '@ionic/storage-angular'; 
// Importamos el servicio `Storage`, que se utiliza para manejar almacenamiento en la aplicación.
import { Storage } from '@ionic/storage-angular'; 
// Importamos un servicio personalizado (`StorageService`) que probablemente interactúa con el `Storage`.
import { StorageService } from '../storage.service'; 

describe('ViajesPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      // Importamos y configuramos el módulo de almacenamiento de Ionic.
      // `forRoot()` inicializa el servicio `Storage`, es ecesario para que funcione en el entorno de pruebas.
      imports: [
        IonicStorageModule.forRoot(), 
      ],
      providers: [
        // Proveemos el servicio `Storage` para que pueda ser inyectado en el componente o servicios relacionados.
        Storage, 
        // Proveemos el servicio `StorageService`, ya que puede ser utilizado por el componente.
        StorageService, 
      ],
    // `compileComponents` compila los componentes necesarios para las pruebas.
    }).compileComponents(); 
    fixture = TestBed.createComponent(ViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
