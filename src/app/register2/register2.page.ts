import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
//import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { IonicModule,AnimationController, Animation  } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service'; 
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class Register2Page implements OnInit {
  username: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private router:Router,private storageService: StorageService,private alertController: AlertController) { }

  async registrarUsuario() {
    if (this.password !== this.repeatPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password // Considera encriptar la contraseña para mayor seguridad
    };

    await this.storageService.guardarUsuario('usuarioActual', userData);
    console.log('Usuario registrado correctamente');
    // Redirigir al usuario o mostrar un mensaje de éxito
  }

  //MODO  OSCURO
  isDarkMode = false;
  ngOnInit() {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', JSON.stringify(this.isDarkMode));
  }

  //MOSTRAR CONTRASEÑA
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  togglePasswordVisibility(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      if (inputElement.type === 'password') {
        inputElement.type = 'text';
      } else {
        inputElement.type = 'password';
      }
    }
  }

  

  volverInicio(){
    this.router.navigate(['register']);
  }
//Revisar metodo
  async mostrarMensajeRegistro2() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Usuario creado correctamente',
      buttons: ['OK']
    });
  
    await alert.present();
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  
  }



}
