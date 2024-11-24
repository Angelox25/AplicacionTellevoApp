// Importamos TestBed, que es el núcleo del sistema de pruebas unitarias de Angular.
// Nos permite configurar y crear un entorno de pruebas para componentes, servicios, etc.
import { TestBed } from '@angular/core/testing'; 
// Importamos el componente que queremos probar, en este caso `BuscarViajePage`.
import { BuscarViajePage } from './buscar-viaje.page'; 
// Importamos el módulo de almacenamiento de Ionic, necesario para inicializar el servicio `Storage`.
import { IonicStorageModule } from '@ionic/storage-angular'; 
// Importamos el servicio `Storage`, que se utiliza para manejar almacenamiento en la aplicación.
import { Storage } from '@ionic/storage-angular'; 
// Importamos un servicio personalizado (`StorageService`) que probablemente interactúa con el `Storage`.
import { StorageService } from '../storage.service'; 

// `describe` es en donde definimos un grupo de pruebas relacionado con el componente `BuscarViajePage`.
describe('BuscarViajePage', () => {

  // Declaramos una variable que contendrá la instancia del componente que vamos a probar.
  let component: BuscarViajePage; 

    // `beforeEach` es una función que se ejecuta antes de cada prueba.
    // Aquí configuramos el entorno necesario para probar el componente.
    beforeEach(async () => { // => es un mientras como tipo while

    // Configuramos el entorno de pruebas.
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

    // Creamos una instancia de `BuscarViajePage` dentro del entorno de pruebas.
    const fixture = TestBed.createComponent(BuscarViajePage); 

    // Guardamos la instancia del componente a la variable `component`.
    // Esto nos permite acceder y realizar pruebas sobre el componente.
    component = fixture.componentInstance; 
  });

  it('Prueba basica de componentes de - Buscar viajes', () => {
    // `it` define un caso de prueba. Este caso verifica que el componente se crea correctamente.

    expect(component).toBeTruthy(); 
    // La prueba pasa si `component` no es `null` o `undefined`.
    // Esto significa que el componente se ha inicializado correctamente.
  });
});


