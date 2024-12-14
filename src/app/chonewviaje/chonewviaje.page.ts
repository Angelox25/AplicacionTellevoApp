import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { StorageService } from 'src/app/storage.service';


//datos del viaje
interface Viaje {
  destino:string;
  capacidad:number;
  costoPasajero:number;
  horaSalida:string;
  programacion:string;  
  identificador:string

}


//declarar una variable de google
declare var google:any;

@Component({
  selector: 'app-chonewviaje',
  templateUrl: './chonewviaje.page.html',
  styleUrls: ['./chonewviaje.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChonewviajePage implements OnInit {
  viajesConReservas: Viaje[] = [];

  // declarar variables de trabajo del mapa
  viajes:Viaje[]=[];  
  
  //Variables de agregar viaje
  destino:string="";
  capacidad:number=0;
  costoPasajero:number=0;
  horaSalida:string="";
  programacion:string=""; 
  currentId: string="";  // para almacenar el identificador
  //otras variables
  mapa:any;
  marker:any;
  puntoreferencia={lat:-33.59839099301328 , lng:-70.57879206793994 } //latitud y longitud
  search:any;
  //variable para calcular 2 puntos
  directionsService:any;
  directionsRenderer:any;  
  viajeForm: FormGroup;
  username:any;

  constructor(private fb: FormBuilder, private router: Router,private activatedRoute: ActivatedRoute,private alertController: AlertController,private storageservice:StorageService) {
    addIcons({
      
    });
    //recepcion de parametros
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
    });
    this.viajeForm = this.fb.group({
      destino: ['', [Validators.required, Validators.minLength(3)]],
      capacidad: ['', Validators.required],
      costoPorViajero: ['', Validators.required],
      horaSalida: ['', Validators.required],
      fechaProgramada: [''] // Campo opcional

    })
   }
     ngOnInit() {
    this.dibujarMapa()
    this.buscaDireccion(this.mapa,this.marker)

  }

     // Método para manejar el envío del formulario
  onSubmit() {
    if (this.viajeForm.valid) {
      console.log('Datos del viaje:', this.viajeForm.value);
      // Navegar a otra página o mostrar un mensaje de confirmación
      this.router.navigate(['/home']);
    } else {
      console.log('Formulario no válido');
    }
  }

  
  dibujarMapa(){
    var mapElement=document.getElementById('map')
    // valido que que la variable existe
    if(mapElement){
      // crea un nuevo mapa
      this.mapa= new google.maps.Map(
        mapElement,
        {
          center:this.puntoreferencia,
          zoom:15 // 1 a 25
        });
      this.marker =  new google.maps.Marker(
        {
          position: this.puntoreferencia,
          map:this.mapa
        }
      )};
      // inicializo las variables para calcular
      this.directionsService=new google.maps.DirectionsService();
      this.directionsRenderer=new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.mapa)
      // variables para leer caja de instrucciones
      var trayecto =document.getElementById('trayecto') as HTMLInputElement | null;
      this.directionsRenderer.setPanel(trayecto);
  } // fin dibujar mapa
  buscaDireccion(mapaLocal:any,marcadorLocal:any){
    var input=document.getElementById('autocomplete')
    if(input){
      const autocomplete=new google.maps.places.Autocomplete(input);
      this.search=autocomplete;
      // Agregamos el movimiento al mapa
     autocomplete.addListener('place_changed',function(){
     const place=autocomplete.getPlace().geometry.location;  // lat y long del texto de la caja
     mapaLocal.setCenter(place); 
     mapaLocal.setZoom(13);
     marcadorLocal.setPosition(place); 
     });
     }else {
      alert("Elemento con id=autocomplete no encontrado");
     }// fin if     
  } // fin busca direccion
  calculaRuta(){
    //alert('Calculo de la ruta en progreso');
    const origen=this.puntoreferencia;
    const destino=this.search.getPlace().geometry.location;
    const  request={
      origin: origen,
      destination:destino,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request,
          (result:any,status:any) =>{
            if (status === google.maps.DirectionsStatus.OK){
              this.directionsRenderer.setDirections(result)
            }else{
              alert('Error al calcular ruta');
            }
            this.marker.setPosition(null)
          }            
        )//fin result service
  } // fin c


  irChofer(){
    this.router.navigate(['chofer']);
  }

  async agregarViaje() {
    // Validación: Verificar que todos los campos estén llenos y válidos
    if (
      !this.destino.trim() || 
      this.capacidad <= 0 || 
      this.costoPasajero <= 0 || 
      !this.horaSalida.trim() || 
      !this.programacion.trim()
    ) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos antes de agregar el viaje.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detiene la ejecución si falta algún campo
    }
  
    // Creación del objeto nuevo viaje
    const nuevoViaje = {
      destino: this.destino,
      capacidad: this.capacidad,
      costoPasajero: this.costoPasajero,
      horaSalida: this.horaSalida,
      programacion: this.programacion,
      identificador: Date.now().toString() // Genera un identificador único
    };
  
    // Agregar el viaje al almacenamiento
    this.viajes.push(nuevoViaje);
    let resp = await this.storageservice.agregarViaje('viajes', nuevoViaje);
  
    if (resp) {
      await this.listar(); // Actualiza la lista de viajes
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `¡Has creado un nuevo viaje! Recuerda que debes estar a las ${this.horaSalida} Horas en el Instituto DuocUC Puente Alto.`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo agregar el viaje. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  
    // Limpiar los campos después de agregar el viaje
    this.destino = "";
    this.capacidad = 0;
    this.costoPasajero = 0;
    this.horaSalida = "";
    this.programacion = "";
  }
  
  
//listar viajes
async listar(){
  this.viajes = await this.storageservice.obtenerDatos('viajes') || [];

}  // fin listar

//Buscar datos
async buscar(id:any){
  let registroEncontrado = await this.storageservice.obtenerDato('viajes',id)

  if (registroEncontrado){
    this.destino = registroEncontrado.destino;
    this.capacidad = registroEncontrado.capacidad;
    this.costoPasajero = registroEncontrado.costoPasajero;
    this.horaSalida = registroEncontrado.horaSalida;
    this.programacion = registroEncontrado.programacion;
    this.currentId = registroEncontrado.identificador;
  } else {
    console.log("Registro no encontrado");
  }

} // fin registro

async eliminar(id:any) {
  await this.storageservice.eliminar('viajes',id);
  await this.listar();

}// fin eliminar

irViajes() {
  this.router.navigate(['/viajes']);
}

async modificar(identificador:String) {
  const viajeModificado: Viaje ={
      destino: this.destino,
      capacidad: this.capacidad,
      costoPasajero: this.costoPasajero,
      horaSalida:this.horaSalida.toString(),
      programacion:this.programacion.toString(),
      identificador: identificador.toString()
  }
  await this.storageservice.actualizar('viajes', viajeModificado)
  await this.listar();

  // Limpieza de campos después de modificar
  this.destino = "";
  this.capacidad = 0;
  this.costoPasajero = 0;
  this.horaSalida = "";
  this.programacion = "";

} // fin modi



}
