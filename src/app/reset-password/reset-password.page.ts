import { Component,  OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonicModule,AnimationController,Animation  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class ResetPasswordPage implements OnInit {
  @ViewChild('logo2', {read:ElementRef}) logo2?:ElementRef<HTMLImageElement>;
  private logoAnimation!:Animation;

  isDarkMode = false;
  async ngOnInit() {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
//MODO NOCHE
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', JSON.stringify(this.isDarkMode));
  }

  loginForm!: FormGroup;

//CONSTRUCTOR CON SUS VALIDACIONES
  constructor(private fb:FormBuilder, private router:Router, private animationCtrl:AnimationController,
    private alertController: AlertController,
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
      ]

  });
  
}
async ngAfterViewInit(){
  if(this.logo2?.nativeElement){
    this.logoAnimation = this.animationCtrl.create()
    .addElement(this.logo2.nativeElement)
    .duration(2500)
    .fromTo('opacity','0','1');
    this.logoAnimation.play()
  }// final del if
  else{
    console.error('Los elementos no fueron encontrados')
  }

}
//MENSAJE DE RESTABLECIMIENTO DE CONTRASEÑA CON 3 SEGUNDO PARA VOLVER AL INICIO
async mostrarMensajeRestablecimiento() {
  const alert = await this.alertController.create({
    header: 'Verifique su correo',
    message: 'Se ha enviado un correo para restablecer su contraseña. Por favor, revise su bandeja de entrada.',
    buttons: ['OK']
  });

  await alert.present();
  setTimeout(() => {
    this.router.navigate(['login']);
  }, 3000);

}

//VOLVER AL INICIO
volverInicio(){
    this.router.navigate(['login']);
  }

}
