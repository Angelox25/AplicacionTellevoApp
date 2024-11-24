import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {calendar,location,qrCodeOutline,scan,home,car, man} from 'ionicons/icons'
import { StorageService } from '../storage.service';

interface Viaje {
  destino: string;
  capacidad: number;
  costoPasajero: number;
  horaSalida: string;
  programacion: string;
  identificador: string;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TabsPage implements OnInit {
  viajes: Viaje[] = [];

  constructor(private storageservice: StorageService) { 
    addIcons({calendar,
              location, 
              'qr-code-outline':qrCodeOutline,
              'qr-scanner':scan,home,car,man
    })
  }

  async  ngOnInit() {
    this.viajes = await this.storageservice.obtenerDatos('viajes') || [];
  }
}
