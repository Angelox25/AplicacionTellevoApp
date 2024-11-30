import { Component,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router,RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnimationController,Animation } from '@ionic/angular';
import {car,albums,home,logOut, man} from 'ionicons/icons'


@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class ChoferPage {
  
  private logoAnimation!:Animation;
  @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;


  constructor(private router:Router,
    private alertController: AlertController,
    private menu: MenuController,
    private animationCtrl:AnimationController,
) { 
    addIcons({car,albums,home,logOut,man
    })

  }

  async ngAfterViewInit(){
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
  irNewViaje(){
    this.router.navigate(['chonewviaje']);
  }



  

}
