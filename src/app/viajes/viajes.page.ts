import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';


interface Viaje {
  destino: string;
  capacidad: number;
  costoPasajero: number;
  horaSalida: string;
  programacion: string;
  identificador: string;
}

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViajesPage implements OnInit {
  viajes: Viaje[] = [];
  //Variables de agregar viaje
  destino:string="";
  capacidad:number=0;
  costoPasajero:number=0;
  horaSalida:string="";
  programacion:string=""; 
  currentId: string=""; 

  constructor(private storageservice: StorageService,
    private router:Router
  ) { 
    
    }

  async  ngOnInit() {

  }
  //listar viajes
  async listar(){
  this.viajes = await this.storageservice.obtenerDatos('viajes') || [];

} 
async eliminar(id:any) {
  await this.storageservice.eliminar('viajes',id);
  await this.listar();

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

volverChofer(){
  this.router.navigate(['chofer']);

}
  


}
