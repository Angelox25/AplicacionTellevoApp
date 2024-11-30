import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule,AnimationController, Animation  } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';


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
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      console.log('Username:', username);
    });
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
    private route: ActivatedRoute
  ) { 

  this.loginForm=this.fb.group({
      username: [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        Validators.pattern('^[a-zA-Z0-9]*$')
        ]
      ],
        password: [
        '',
        [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
        ]
      ]
  }) ;

  }// final del constructor

  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const loginSuccessful = await this.userService.iniciarSesion(username, password);

      if (loginSuccessful) {
        console.log('Inicio de sesión exitoso');
        
        this.router.navigate(['home'], { queryParams: { username: username } });

        // Redirigir a la página principal o dashboard
      } else {
        console.log('Error en la autenticación: Credenciales incorrectas');
        // Mostrar un mensaje de error al usuario
      }
    } else {
      console.log('Formulario no válido');
    }
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
