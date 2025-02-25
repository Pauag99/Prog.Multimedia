import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent{
img: any;  
  constructor(
    private router: Router, 
    private soundService: SoundService,
  ) {}


  //Esta funcion te redirige a las paginas web al pasarle como dato la pagina y a la vez le pone el sonido de paso de pagina
  irAPagina(pagina: string): void{
    this.router.navigate([pagina]);
    this.soundService.playSound('click.mp3');
  }
}