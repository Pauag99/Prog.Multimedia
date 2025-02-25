import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SoundService } from './services/sound.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importamos el enrutador para las rutas
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  constructor(private router: Router, private soundService: SoundService) {}

  //Esta funcion te redirige a la pagina principal y a la vez le pone el sonido de paso de pagina
  irAPagina(pagina: string){
    this.router.navigate([pagina]);
    this.soundService.playSound('click.mp3');
  }
}
