import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-blackjack-list',
  imports: [],
  templateUrl: './blackjack-list.component.html',
  styleUrls: ['./blackjack-list.component.scss'],
  
})
export class BlackjackListComponent implements OnInit{
  
  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    this.cargarScript('./js/underscore-min.js');
    this.cargarScript('./js/juego.js');  // Llamamos a la función para cargar el script
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
}