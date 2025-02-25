import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'inicio', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
  { path: 'pizza', loadComponent: () => import('./pizza/pizza-list/pizza-list.component').then(m => m.PizzaListComponent)},
  { path: 'blackjack', loadComponent: () => import('./blackjack/blackjack-list/blackjack-list.component').then(m => m.BlackjackListComponent)},
  { path: 'statics' , loadComponent: () => import('./statics/statics-list/statics-list.component').then(m => m.StaticsListComponent)},
  { path: 'cinema', loadComponent: () => import('./cinema/cinema-list/cinema-list.component').then(m => m.CinemaListComponent)},
  { path: 'sports', loadComponent: () => import('./sports/sports-list/sports-list.component').then(m => m.SportsListComponent)},
  { path: 'fruitshop', loadComponent: () => import('./fruitshop/fruitshop-list/fruitshop-list.component').then(m => m.FruitshopListComponent)},
  { path: 'arcade', loadComponent: () => import('./arcade/arcade-list/arcade-list.component').then(m => m.ArcadeListComponent)},
  { path: 'barbershop', loadComponent: () => import('./barbershop/barbershop-list/barbershop-list.component').then(m => m.BarbershopListComponent)},
];
    