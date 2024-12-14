import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule,AnimationController, Animation   } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username: string = '';
  password: string = '';

    //Prueba unitaria 4
    is_logued:boolean =false
  
  isDarkMode = false;
  ngOnInit() {
    // Detectar tema oscuro
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      console.log('Username:', username);
    });

    // Limpia el historial del navegador al cargar la página
    history.pushState(null, '', location.href);
    history.replaceState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href); // Evita volver atrás
    };

    console.log('Historial limpiado y botón atrás bloqueado');
    this.router.navigateByUrl('/login', { replaceUrl: true });


  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', JSON.stringify(this.isDarkMode));
  }
  
   @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;
   @ViewChild('text', {read:ElementRef}) text?:ElementRef<HTMLImageElement>;

   private logoAnimation!:Animation;
   private textAnimation!:Animation;

  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private animationCtrl:AnimationController,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { 

    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[a-zA-Z0-9._%+-]+@(profesorduoc\\.cl|duocuc\\.cl)$') // Solo correos válidos
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*$') // Solo números para contraseña
        ]
      ]
    });
    

  }// final del constructor

  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const loginSuccessful = await this.userService.iniciarSesion(username, password);
  
      if (loginSuccessful) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['home'], { queryParams: { username: username } });
      } else {
        console.log('Error en la autenticación: Credenciales incorrectas');
        this.mostrarAlertaError(); // Muestra la alerta
      }
    } else {
      console.log('Formulario no válido');
    }
  }
  
  // Método para mostrar la alerta de error
  async mostrarAlertaError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }


  onForgotPassword(){    
      this.router.navigate(['reset-password']);
      //Agregue mensaje para la consola si esta o no validado 
      console.log('Redireccionado al reset password');
  }
  onCreateAccount(){
    this.router.navigate(['register']);
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

} // Final 
