import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)

  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'chofer',
    loadComponent: () => import('./chofer/chofer.page').then( m => m.ChoferPage)
    
  },
  {
    path: 'pasajero',
    loadComponent: () => import('./pasajero/pasajero.page').then( m => m.PasajeroPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'register2',
    loadComponent: () => import('./register2/register2.page').then( m => m.Register2Page)
  },  
  {
    path: 'chonewviaje',
    loadComponent: () => import('./chonewviaje/chonewviaje.page').then( m => m.ChonewviajePage)
  },
  {
    path: 'viajes',
    loadComponent: () => import('./viajes/viajes.page').then( m => m.ViajesPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
    ,children:[
      {
        path: 'pasajero',
        loadComponent: () => import('./pasajero/pasajero.page').then( m => m.PasajeroPage)
    
      },
      {
        path: 'chofer',
        loadComponent: () => import('./chofer/chofer.page').then( m => m.ChoferPage)
        
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
      },

    ]
  },
  {
    path: 'buscar-viaje',
    loadComponent: () => import('./buscar-viaje/buscar-viaje.page').then( m => m.BuscarViajePage)
  }
  



];
