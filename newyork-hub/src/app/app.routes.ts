import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'blackjack', loadComponent: () => import('./blackjack/blackjack-list/blackjack-list.component').then(m => m.BlackjackListComponent)},
  { path: 'statics' , loadComponent: () => import('./statics/statics-list/statics-list.component').then(m => m.StaticsListComponent)},
  { path: 'pizza', loadComponent: () => import('./pizza/pizza-list/pizza-list.component').then(m => m.PizzaListComponent)},
  { path: 'inicio', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
];
    