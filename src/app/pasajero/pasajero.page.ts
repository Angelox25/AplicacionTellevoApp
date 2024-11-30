import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { MenuController } from '@ionic/angular';
import {car,albums,home,logOut, man} from 'ionicons/icons'
import { AnimationController,Animation } from '@ionic/angular';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class PasajeroPage  {
  
  private logoAnimation!:Animation;
  @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;

  constructor(private router:Router,private menu: MenuController,
    private animationCtrl:AnimationController,

  ) { 
    addIcons({car,albums,home,logOut,man
    })

  }
  ngAfterViewInit(){
    if(this.logo?.nativeElement){
      this.logoAnimation = this.animationCtrl.create()
      .addElement(this.logo.nativeElement)
      .duration(2500)
      .fromTo('opacity','0','1');
      this.logoAnimation.play()
    }// final del if
    else{
      console.error('Los elementos no fueron encontrados')
    }
  }
  ionViewWillEnter() {
    this.menu.enable(true, 'main-menu'); // Habilita el menú específico
  }

  ionViewWillLeave() {
    this.menu.enable(false, 'main-menu'); // Deshabilita el menú al salir
  }
  volverHome(){
    this.router.navigate(['home']);
  }

  irviajes(){
    this.router.navigate(['buscar-viaje']);
  }


  
}
