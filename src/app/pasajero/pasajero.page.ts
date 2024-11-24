import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { MenuController } from '@ionic/angular';

import {car,albums,home,logOut, man} from 'ionicons/icons'

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class PasajeroPage  {
  

  constructor(private router:Router,private menuCtrl: MenuController) { 
    addIcons({car,albums,home,logOut,man
    })

  }
  volverHome(){
    this.router.navigate(['home']);
  }

  irviajes(){
    this.router.navigate(['buscar-viaje']);
  }

  openMenu() {
    this.menuCtrl.open('main-menu'); // Identificador del menú (por defecto "first")
  }

  
}
