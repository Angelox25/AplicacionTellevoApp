import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router,RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { AlertController } from '@ionic/angular';


import {car,albums,home,logOut, man} from 'ionicons/icons'


@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class ChoferPage {

  constructor(private router:Router,private alertController: AlertController) { 
    addIcons({car,albums,home,logOut,man
    })

  }
  volverHome(){
    this.router.navigate(['home']);
  }
  irNewViaje(){
    this.router.navigate(['chonewviaje']);
  }



  

}
