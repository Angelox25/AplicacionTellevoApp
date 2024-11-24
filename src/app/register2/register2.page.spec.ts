import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register2Page } from './register2.page';
// Importamos el servicio `Storage`, que se utiliza para manejar almacenamiento en la aplicación.
import { Storage } from '@ionic/storage-angular'; 
// Importamos un servicio personalizado (`StorageService`) que probablemente interactúa con el `Storage`.
import { StorageService } from '../storage.service'; 
// Importamos el módulo de almacenamiento de Ionic, necesario para inicializar el servicio `Storage`.
import { IonicStorageModule } from '@ionic/storage-angular'; 

describe('Register2Page', () => {
  // Declaramos una variable que contendrá la instancia del componente que vamos a probar.
  let component: Register2Page;
  let fixture: ComponentFixture<Register2Page>;

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
    fixture = TestBed.createComponent(Register2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Prueba basica de carga de componentes register2', () => {
    expect(component).toBeTruthy();
  });
});
