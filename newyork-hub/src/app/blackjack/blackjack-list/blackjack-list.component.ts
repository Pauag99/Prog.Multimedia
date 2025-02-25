import { Component } from '@angular/core';

@Component({
  selector: 'app-blackjack-list',
  imports: [],
  templateUrl: './blackjack-list.component.html',
  styleUrl: './blackjack-list.component.scss',
  
})
export class BlackjackListComponent {/*
  deck         = [];
  tipos      = ['C','D','H','S'];
  especiales = ['A','J','Q','K'];

  puntosJugadores = [];

  // Referencias del HTML
  btnPedir   = document.getElementById('#btnPedir');
  btnDetener = document.getElementById('#btnDetener');
  btnNuevo   = document.getElementById('#btnNuevo');

  divCartasJugadores = document.querySelectorAll('.divCartas');
  puntosHTML = document.querySelectorAll('small');

  ngonInit(): void{
      const inicializarJuego = ( numJugadores = 2 ) => {
      this.deck = crearDeck();

        this.puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) {
            this.puntosJugadores.push();
        }
        
        this.puntosHTML.forEach( elem => elem.innerText = '0' );
        this.divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        /*this.btnPedir.disabled   = false;
        this.btnDetener.disabled = false;*/

    }
/*
    // Esta función crea un nuevo deck
    const crearDeck = () => {

        this.deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of this.tipos ) {
              this.deck.push( i + tipo);
            }
        }

        for( let tipo of this.tipos ) {
            for( let esp of this.especiales ) {
              this.deck.push( esp + tipo);
            }
        }
        return _.shuffle( this.deck );
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if ( this.deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return this.deck.pop();
    }

    const valorCarta = ( carta: string ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta: undefined, turno: number ) => {
        this.puntosJugadores[turno] = this.puntosJugadores[turno] + valorCarta( carta );
        this.puntosHTML[turno].innerText = this.puntosJugadores[turno];
        return this.puntosJugadores[turno];
    }

    const crearCarta = ( carta: undefined, turno: number ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `./img/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        this.divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = this.puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );

    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos: number ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, this.puntosJugadores.length - 1 );
            crearCarta(carta, this.puntosJugadores.length - 1 );

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador();
    }

      
    }
    
    btnPedirClick(){
      const carta = pedirCarta();
      const puntosJugador = acumularPuntos( carta, 0 );
      
      crearCarta( carta, 0 );


      if ( puntosJugador > 21 ) {
          console.warn('Lo siento mucho, perdiste');
          /*btnPedir.disabled   = true;
          btnDetener.disabled = true;*//*
          turnoComputadora( puntosJugador );

      } else if ( puntosJugador === 21 ) {
         console.warn('21, genial!');
          /*btnPedir.disabled   = true;
          btnDetener.disabled = true;*//*
          turnoComputadora( puntosJugador );
      }
    }

    btnDetenerClick(){
      /*btnPedir.disabled   = true;
      btnDetener.disabled = true;*//*

      turnoComputadora( this.puntosJugadores[0] );
    }

    btnNuevoClick(){
      inicializarJuego();
    }

    hola(){
      console.log
    }

  }
function pedirCarta() {
  throw new Error('Function not implemented.');
}

function acumularPuntos(carta: void, arg1: number) {
  throw new Error('Function not implemented.');
}

function crearCarta(carta: void, arg1: number) {
  throw new Error('Function not implemented.');
}

function turnoComputadora(puntosJugador: any) {
  throw new Error('Function not implemented.');
}

function inicializarJuego() {
  throw new Error('Function not implemented.');
}*/
