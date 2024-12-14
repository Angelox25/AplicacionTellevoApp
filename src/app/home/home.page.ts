import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule,AnimationController, Animation } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'; // Importa el UserService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule],
})
export class HomePage implements OnInit {

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', JSON.stringify(this.isDarkMode));
  }

  @ViewChild('logo2', {read:ElementRef}) logo2?:ElementRef<HTMLImageElement>;
  @ViewChild('text', {read:ElementRef}) text?:ElementRef<HTMLImageElement>;

  private logoAnimation!:Animation;
  private textAnimation!:Animation;
  username:any;

  constructor(private router:Router,
    private animationCtrl:AnimationController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    //recepcion de parametros
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  async ngAfterViewInit(){
    if(this.logo2?.nativeElement && this.text?.nativeElement){
      this.logoAnimation = this.animationCtrl.create()
      .addElement(this.logo2.nativeElement)
      .duration(2500)
      .fromTo('opacity','0','1');

      this.textAnimation = this.animationCtrl.create()
      .addElement(this.text.nativeElement)
      .duration(1000)
      .fromTo('transform','translatex(50px)','translateY(0)');

      this.logoAnimation.play()
      this.textAnimation.play()
    }// final del if
    else{
      console.error('Los elementos no fueron encontrados')
    }

  }
  Chofer(){
    this.router.navigate(['chofer']);
  }
  Pasajero(){
    this.router.navigate(['pasajero']);
  }
  cerrarSesion(){
    this.router.navigateByUrl('/login', { replaceUrl: true });

  }


  

}
