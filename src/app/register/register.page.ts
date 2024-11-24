import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
//import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { IonicModule,AnimationController, Animation  } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;


  formData = {
    nombre: '',
    apellidos: '',
    rut: '',
    correo: '',
    telefono: '',
    
  };

  

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

  constructor(private fb: FormBuilder, private router: Router, private animationCtrl:AnimationController) { 
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      rut: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
    
  }
  volverInicio(){
    this.router.navigate(['login']);
  }
  
  continuarRegistro(){
    this.router.navigate(['register2']);
  }

  isFormValid(): boolean {
    const { nombre, apellidos, rut, correo, telefono } = this.formData;
    return (
      nombre.trim() !== '' &&
      apellidos.trim() !== '' &&
      rut.trim() !== '' &&
      correo.trim() !== '' &&
      telefono.trim() !== ''
    );
  }

  hasLicense: boolean = false;
  toggleLicense() {

  }



  
 

}
