import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-blackjack-list',
  imports: [],
  templateUrl: './blackjack-list.component.html',
  styleUrls: ['./blackjack-list.component.scss'],

})
export class BlackjackListComponent implements OnInit, OnDestroy{

  constructor(private renderer: Renderer2, private soundService: SoundService){}

  ngOnInit(): void {
    this.cargarScript('./js/underscore-min.js');
    this.cargarScript('./js/juego.js');  // Llamamos a la función para cargar el script
    this.soundService.playBackgroundMusic('casino.mp3', 0.15);
  }

  cargarScript(url: string, callback?: ()=> void): void {
    const script = this.renderer.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = () => {
      console.log(`Script ${url} cargado correctamente`);
      if (callback) callback();
    };
    this.renderer.appendChild(document.body, script);
  }

  cardSound(){
    this.soundService.playSound('card.mp3');
  }

  ngOnDestroy(): void {
      this.soundService.stopBackgroundMusic();
      this.soundService.stopSound();
  }
}
