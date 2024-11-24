import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Variables auxiliares
  datos:any[]=[];
  dato:any={};

  private storage:Storage | null = null; // Definiendo la propiedad 'storage'

  constructor(private storageInstance: Storage) { 
    this.init(); // inicializo almacenamiento
  }// construccion inicilizacion

  async init(){
      // Configurar libreria
      const storage = await this.storageInstance.create();
      if(!this.storage){
        this.storage =await this.storageInstance.create();
      }
      
  } // fin init

//    03-11-2024
  async guardarUsuario(userKey: string, userData: any): Promise<void> {
    await this.init(); // Aseguramos que Storage esté inicializado
    await this.storage?.set(userKey, userData);
  }

  async obtenerUsuario(userKey: string): Promise<any> {
    await this.init(); // Aseguramos que Storage esté inicializado
    return await this.storage?.get(userKey);
  }

//metodo agregar viajes
async agregarViaje(key: string, jsonAgregar:any) {
  await this.init(); // Aseguramos que Storage esté inicializado
  this.datos = await this.storage?.get(key) || []; //llave - valor 
  let existe =await this.obtenerDato(key,jsonAgregar.identificador)

  if (existe == undefined) {
      this.datos.push(jsonAgregar)
      await this.storage?.set(key,this.datos);
      return true;
  }
  return false;
} // Fin Agregar

//obtener datos
async  obtenerDatos(key:string) {
  await this.init(); // Aseguramos que Storage esté inicializado
  if (!this.storage) {
   throw new Error ('Storage no esta inicializado')
  }
  this.datos =await this.storage.get(key) || [];
  return this.datos;

} // fin obtenerDatos

async obtenerDato(key:string, identificador:string){
  await this.init(); // Aseguramos que Storage esté inicializado
  this.datos =  await this.storage?.get(key) || [];
  this.dato = this.datos.find(valor => valor.identificador == identificador);
  return this.dato;

} // fin obtener dato

async eliminar(key:string, identificador:string){
  await this.init(); // Aseguramos que Storage esté inicializado
  this.datos =await this.storage?.get(key) || [];

  this.datos.forEach( (valor,indice) => {
    if(valor.identificador == identificador){

        this.datos.splice(indice,1)
    }
  });
  await this.storage?.set(key,this.datos)

} // Fin eliminar

async actualizar(key:string, jsonModificado:any) {
  await this.init(); // Aseguramos que Storage esté inicializado
  this.datos =await this.storage?.get(key) || [];
  let indice =this.datos.findIndex(valor => valor.identificador == jsonModificado.identificador)

  this.datos[indice] = jsonModificado;
  await this.storage?.set(key,this.datos)

}


} // fin class StorageService
