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
    // Validar que todos los campos estén llenos
    if (!this.username.trim() || !this.password.trim() || !this.repeatPassword.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios. Por favor, complétalos antes de registrar.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detiene la ejecución si algún campo está vacío
    }
  
    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(profesorduoc\.cl|duocuc\.cl)$/;
    if (!emailRegex.test(this.username)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El correo electrónico debe terminar en @profesorduoc.cl o @duocuc.cl.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    // Validar que las contraseñas coincidan
    if (this.password !== this.repeatPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    // Guardar usuario
    const userData = {
      username: this.username,
      password: this.password // Nota: En producción, encripta la contraseña
    };
  
    await this.storageService.guardarUsuario('usuarioActual', userData);
    console.log('Usuario registrado correctamente');
  
    // Mostrar mensaje de éxito
    const successAlert = await this.alertController.create({
      header: 'Éxito',
      message: '¡Usuario creado correctamente!',
      buttons: ['OK']
    });
    await successAlert.present();
  
    // Limpiar los campos después del registro
    this.username = '';
    this.password = '';
    this.repeatPassword = '';
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
    this.router.navigate(['login']);
  }




}
