import { TestBed } from '@angular/core/testing';

import { IonicStorageModule } from '@ionic/storage-angular'; 
import { Storage } from '@ionic/storage-angular'; 
import { StorageService } from './storage.service'; 

describe('StorageService', () => {
  let service: StorageService;

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
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('Carga del servicioStorage exitosa', () => {
    expect(service).toBeTruthy();
  });
});
