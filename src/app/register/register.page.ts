import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  private logoAnimation!:Animation;
  @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;


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

  constructor(private fb: FormBuilder, private router: Router, 
    private animationCtrl:AnimationController) { 
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
    
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
  volverInicio(){
    this.router.navigate(['login']);
  }
  
  continuarRegistro(){
    this.router.navigate(['register2']);
  }

  isFormValid(): boolean {
    const { nombre, apellidos, rut, telefono } = this.formData;
    return (
      nombre.trim() !== '' &&
      apellidos.trim() !== '' &&
      rut.trim() !== '' &&
      telefono.trim() !== ''
    );
  }

  hasLicense: boolean = false;
  toggleLicense() {

  }



  
 

}
