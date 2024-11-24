import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

declare var google: any;


@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BuscarViajePage implements OnInit {
  viajes: Viaje[] = [];
  destino:string="";
  capacidad:number=0;
  costoPasajero:number=0;
  horaSalida:string="";
  programacion:string=""; 
  currentId: string="";
  asientosReservados: number = 1;  // Cantidad de asientos a reservar

  // Variables para el mapa
  mapa: any;
  marker: any;
  directionsService: any;
  directionsRenderer: any;
  origen: any = { lat: -33.59839099301328, lng: -70.57879206793994 };

  constructor(private router: Router, 
    private storageservice: StorageService,
    private alertController: AlertController) { }

  async  ngOnInit() {
    this.viajes = await this.storageservice.obtenerDatos('viajes') || [];
    this.inicializarMapa();
  }
  
// Método para inicializar el mapa de Google Maps
inicializarMapa() {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    this.mapa = new google.maps.Map(mapElement, {
      center: this.origen,
      zoom: 15
    });
    this.marker = new google.maps.Marker({
      position: this.origen,
      map: this.mapa
    });
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.mapa);
  }
}

// Configura la dirección del destino en el mapa
configurarDireccion() {
  if (!this.destino) {
    this.alertController.create({
      header: 'Error',
      message: 'Destino no especificado',
      buttons: ['OK']
    }).then(alert => alert.present());
    return;
  }
  // Configura el autocompletado de dirección (similar a buscaDireccion en ChonewviajePage)
  const input = document.getElementById('autocomplete');
  if (input) {
    const autocomplete = new google.maps.places.Autocomplete(input as HTMLInputElement);
    autocomplete.setFields(['geometry']);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.mapa.setCenter(place.geometry.location);
        this.marker.setPosition(place.geometry.location);
      } else {
        this.alertController.create({
          header: 'Error',
          message: 'Ubicación no encontrada',
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    });
  } else {
    console.log("Elemento de autocompletar no encontrado");
  }
}
  // Muestra la ruta desde el origen hasta el destino en el mapa
  mostrarRuta() {
    if (!this.directionsService || !this.destino) {
      this.alertController.create({
        header: 'Error',
        message: 'Servicio de rutas o destino no inicializado',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }

    const request = {
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        this.alertController.create({
          header: 'Error',
          message: 'No se pudo calcular la ruta',
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    });
  }

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
}
async listar(){
  this.viajes = await this.storageservice.obtenerDatos('viajes') || [];
}


// Método para reservar asientos
async reservarAsientos() {
  if (this.asientosReservados > this.capacidad) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'La cantidad de asientos solicitada excede la capacidad disponible.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }
  // Calcular la nueva capacidad disponible
  const nuevaCapacidad = this.capacidad - this.asientosReservados;
  const totalAPagar = this.costoPasajero * this.asientosReservados; // Costo total
  // Actualizar el viaje con la nueva capacidad
  const viajeModificado: Viaje = {
    destino: this.destino,
    capacidad: nuevaCapacidad,
    costoPasajero: this.costoPasajero,
    horaSalida: this.horaSalida,
    programacion: this.programacion,
    identificador: this.currentId
  };
  await this.storageservice.actualizar('viajes', viajeModificado);
  await this.listar();
  // Mostrar mensaje de confirmación
  const alert = await this.alertController.create({
    header: 'Reserva Exitosa',
    message: `Has reservado ${this.asientosReservados} asientos. Capacidad restante: ${nuevaCapacidad}`,
    buttons: ['OK']
  });
  await alert.present();
  // Limpiar el campo de asientos reservados después de reservar
  this.asientosReservados = 1;
}

}

interface Viaje {
  destino: string;
  capacidad: number;
  costoPasajero: number;
  horaSalida: string;
  programacion: string;
  identificador: string;
}
