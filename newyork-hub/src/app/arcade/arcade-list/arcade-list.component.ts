import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SoundService } from '../../services/sound.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Puntuacion {
  nombre: string;
  puntos: number;
}

@Component({
  selector: 'app-arcade-list',
  imports: [ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './arcade-list.component.html',
  styleUrl: './arcade-list.component.scss'
})
export class ArcadeListComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private ship = { x: 400, y: 300, angle: 0, radius: 15 };
  private keys: { [key: string]: boolean } = {};
  private asteroids: Asteroid[] = [];
  private bullets: Bullet[] = [];
  private gameOver = false;
  private gamePaused = false;
  public gameStarted = false;
  private animationFrameId: number | null = null;
  private dificult = 1;
  private asteroidTime: number = 2000;
  private asteriodInterval: any;
  private asteroidSpeed: number = 1;
  public puntos: number = 0;
  public volume = 50;
  nombreJugador = new FormControl('');
  
  dificultad = new FormGroup({
    nombre: new FormControl(''),  // Agrega el campo de nombre
    dificultad: new FormControl('Facil'),  // Dificultad
    sprite: new FormControl('sprite1'),  // Valor por defecto para la nave
    //tipoMeteorito: new FormControl('circle')  // Nuevo control para el tipo de meteorito
  });
 
  // Mejores puntuaciones
  mejoresPuntuaciones: Puntuacion[] = [
    { nombre: 'Pau', puntos: 200 },
    { nombre: 'Antonio', puntos: 150 },
    { nombre: 'Mario', puntos: 100 }
  ];

  // Nuevo: Variable para el sprite
  sprite: string = 'sprite1'; // Default es 'sprite1'
  shipImage: HTMLImageElement | null = null; // Variable para la imagen de la nave
  shipType: string = 'triangle'; // Usaremos esto para saber qué tipo de nave es (por defecto es un triángulo)

  constructor(private soundService: SoundService) {
    this.dificultad.get('opciones')?.valueChanges.subscribe(value => {
      console.log("Opcion: ", value);
    })
  }

  ngOnInit() {
    this.actualizarMejoresPuntuaciones();
    this.soundService.playSound('asteroid.mp3', 0.20);
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    this.startAsteroidGeneration();

    this.dificultad.get('sprite')?.valueChanges.subscribe(value => {
      this.sprite = value ?? 'sprite1';  // Actualiza la variable sprite
      this.loadShipImage();  // Vuelve a cargar la imagen cuando cambie el valor
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pausarPartida();
      }
    });
  }

  // Función para cargar la imagen de la nave según el sprite
  loadShipImage() {
    this.shipImage = null;

    if (this.sprite === 'sprite2') {
      this.shipType = 'sprite2';
      this.shipImage = new Image();
      this.shipImage.src = './img/nave2.png';
      console.log('sprite2')
      // Ruta de la imagen
    } else if (this.sprite === 'sprite3') {
      this.shipType = 'sprite3';
      this.shipImage = new Image();
      this.shipImage.src = './img/nave3.png';
      console.log('sprite3')
      // Ruta de la imagen
    } else {
      this.shipType = 'triangle'; // Si es sprite1, usamos el triángulo por defecto
      console.log('triangulo')
    }

  }

  iniciarPartida() {
    this.resetGame();
    this.gameOver = false;
    this.gamePaused = false;
    this.gameStarted = true;  // Deshabilitar el botón de iniciar
    this.puntos = 0;

    if(this.dificultad.get('dificultad')?.value === 'Normal')
      this.dificult = 2;
    else if(this.dificultad.get('dificultad')?.value === 'Dificil')
      this.dificult = 3;

    this.asteroidTime = 2000 * this.dificult;
    this.asteroidSpeed = 1 * this.dificult;

    // Iniciar con la nave correspondiente
    this.loadShipImage();

    this.update();
  }

  private drawShip() {
    this.ctx.save();
    this.ctx.translate(this.ship.x, this.ship.y);
    this.ctx.rotate(this.ship.angle);

    if (this.shipType === 'triangle') {
      // Si la nave es un triángulo, dibujamos el triángulo
      this.ctx.beginPath();
      this.ctx.moveTo(15, 0);
      this.ctx.lineTo(-15, 10);
      this.ctx.lineTo(-15, -10);
      this.ctx.closePath();
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();
    } else if (this.shipImage) {
      // Si es un sprite, dibujamos la imagen
      this.ctx.drawImage(this.shipImage, -this.shipImage.width / 2, -this.shipImage.height / 2);
    }

    this.ctx.restore();
  }

  startAsteroidGeneration() {
    clearInterval(this.asteriodInterval);
    this.asteriodInterval = setInterval(() => this.spawnAsteroid(), this.asteroidTime);
  }

  pausarPartida() {
    this.gamePaused = true;
    this.gameStarted = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    clearInterval(this.asteriodInterval);
    if(this.puntos != 0)
      this.actualizarMejoresPuntuaciones(); // Llamar cuando se pausa el juego

    this.puntos = 0;
  }

  resetGame() {
    this.ship = { x: 400, y: 300, angle: 0, radius: 15 };
    this.asteroids = [];
    this.bullets = [];
    this.spawnAsteroids();
    this.startAsteroidGeneration();
  }

  private spawnAsteroids() {
    //const tipoMeteorito = this.dificultad.get('tipoMeteorito')?.value ?? 'circle'; // Obtenemos el tipo de meteorito seleccionado
    let asteroidX = Math.random() * 500;
    let asteroidY = Math.random() * 500;
    
    if (asteroidX == this.ship.x) asteroidX += 200;
    if (asteroidY == this.ship.y) asteroidY += 200;
  
    /*if (tipoMeteorito === 'circle') {
      this.asteroids.push(new Asteroid(asteroidX, asteroidY, 30, this.asteroidSpeed, Math.random() * Math.PI * 2, 'black'));
    } else if (tipoMeteorito === 'image') {
      this.asteroids.push(new Asteroid(asteroidX, asteroidY, 30, this.asteroidSpeed, Math.random() * Math.PI * 2));
    }*/
  }
  

  private spawnAsteroid() {
    this.asteroids.push(new Asteroid(Math.random() * 500, Math.random() * 500, 30, this.asteroidSpeed, Math.random() * Math.PI * 2));
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }

    this.keys[event.key] = true;
    if (event.key === ' ') {
      this.shoot();
      //this.soundService.playSound('disparo.mp3');
      event.preventDefault();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  private shoot() {
    this.bullets.push(new Bullet(this.ship.x, this.ship.y, this.ship.angle));
  }

  private update() {
    if (this.gameOver || this.gamePaused) return;

    this.clearCanvas();
    this.drawStars(); 
    this.updateShip();
    this.updateAsteroids();
    this.updateBullets();
    this.checkCollisions();
    this.drawShip();
    this.drawAsteroids();
    this.drawBullets();
    this.animationFrameId = requestAnimationFrame(() => this.update());
  }

  private clearCanvas() {
    this.ctx.fillStyle = 'black'; // Puedes cambiar 'black' a cualquier color que prefieras (como 'darkblue')
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
  }

  private drawStars() {
    const numStars = 100; // Número de estrellas
    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * this.gameCanvas.nativeElement.width; // Posición X aleatoria
      const y = Math.random() * this.gameCanvas.nativeElement.height; // Posición Y aleatoria
      const size = Math.random() * 2; // Tamaño aleatorio para las estrellas
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2); // Dibuja una estrella como un pequeño círculo
      this.ctx.fillStyle = 'white'; // Establece el color de la estrella a blanco
      this.ctx.fill();
    }
  }

  private updateShip() {
    if (this.keys['ArrowUp']) {
      this.ship.x += Math.cos(this.ship.angle) * 2;
      this.ship.y += Math.sin(this.ship.angle) * 2;
    }
    if (this.keys['ArrowDown']) {
      this.ship.x -= Math.cos(this.ship.angle) * 2;
      this.ship.y -= Math.sin(this.ship.angle) * 2;
    }
    if (this.keys['ArrowLeft']) {
      this.ship.angle -= 0.05;
    }
    if (this.keys['ArrowRight']) {
      this.ship.angle += 0.05;
    }

    // Mantener la nave dentro de los límites del canvas
    if (this.ship.x < 0) this.ship.x = 500;
    if (this.ship.x > 500) this.ship.x = 0;
    if (this.ship.y < 0) this.ship.y = 500;
    if (this.ship.y > 500) this.ship.y = 0;
  }

  private updateAsteroids() {
    for (const asteroid of this.asteroids) {
      asteroid.update();
    }
  }

  private updateBullets() {
    for (const bullet of this.bullets) {
      bullet.update();
    }
  }

  private checkCollisions() {
    // Colisiones entre balas y asteroides
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      for (let j = this.asteroids.length - 1; j >= 0; j--) {
        const dx = this.bullets[i].x - this.asteroids[j].x;
        const dy = this.bullets[i].y - this.asteroids[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.asteroids[j].radius) {
          this.bullets.splice(i, 1);
          this.asteroids.splice(j, 1);
          this.puntos += 10;
          if (this.puntos % 50 == 0 && this.asteroidTime > 500) {
            this.asteroidTime -= 250;
            this.startAsteroidGeneration();
          }
          if (this.puntos > 0 && this.puntos % 100 == 0) {
            this.asteroidSpeed += 1;
          }
          break;
        }
      }
    }

    // Colisiones entre la nave y los asteroides
    for (const asteroid of this.asteroids) {
      const dx = this.ship.x - asteroid.x;
      const dy = this.ship.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < asteroid.radius + this.ship.radius) {
        this.gameOver = true;
        alert('Game Over');
        this.actualizarMejoresPuntuaciones();
        this.resetGame();
        break;
      }
    }
  }

  private drawAsteroids() {
    for (const asteroid of this.asteroids) {
      asteroid.draw(this.ctx);
    }
  }

  private drawBullets() {
    for (const bullet of this.bullets) {
      bullet.draw(this.ctx);
    }
  }

  private actualizarMejoresPuntuaciones() {
    const nombre: string = this.nombreJugador.value?.trim() || 'Unknown';

    this.mejoresPuntuaciones.push({ nombre, puntos: this.puntos });
    this.mejoresPuntuaciones.sort((a, b) => b.puntos - a.puntos);

    this.gameStarted = false;
  }

  onVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = Number(input.value);  // Obtiene el valor del control range
  }
}

class Asteroid {
  //public image: HTMLImageElement | null = null; // Variable para la imagen del meteorito

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public speed: number,
    public angle: number,
    public color: string = "black",
    //public sprite: string = 'circle'  // Se agrega un nuevo parámetro 'sprite' para decidir entre círculo o imagen
  ) {}

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if (this.x < 0) this.x = 500;
    if (this.x > 500) this.x = 0;
    if (this.y < 0) this.y = 500;
    if (this.y > 500) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    /*if (this.sprite != 'circle') {
      this.image = new Image();
      //this.image.src = './img/meteorito.png'; // Ruta de la imagen del meteorito
    }*/
    ctx.stroke();
  }
}

class Bullet {
  constructor(public x: number, public y: number, public angle: number) { }

  update() {
    this.x += Math.cos(this.angle) * 5;
    this.y += Math.sin(this.angle) * 5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
