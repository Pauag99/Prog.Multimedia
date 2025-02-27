import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-arcade-list',
  imports: [],
  templateUrl: './arcade-list.component.html',
  styleUrl: './arcade-list.component.scss'
})
export class ArcadeListComponent implements OnInit{
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private ship = { x: 400, y: 300, angle: 0, radius: 15 };
  private keys: { [key: string]: boolean } = {};
  private asteroids: Asteroid[] = [];
  private bullets: Bullet[] = [];
  private gameOver = false;
  private gamePaused = false;
  private animationFrameId: number | null = null;
  public puntos: number = 0;
  private asteroidTime: number = 2000;
  private asteriodInterval: any;
  private asteroidSpeed: number = 1;

  constructor(private soundService: SoundService){}

  ngOnInit() {
    //this.soundService.playSound('asteroid.mp3');
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    this.startAsteroidGeneration();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pausarPartida();
      }
    });
  }

  startAsteroidGeneration(){
    clearInterval(this.asteriodInterval);
    this.asteriodInterval = setInterval(() => this.spawnAsteroid(), this.asteroidTime);
  }

  iniciarPartida() {
    this.resetGame();
    this.gameOver = false;
    this.gamePaused = false;
    this.puntos = 0;
    this.asteroidTime = 2000;
    this.asteroidSpeed = 1;
    this.update();
  }

  pausarPartida() {
    this.gamePaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    clearInterval(this.asteriodInterval);
  }

  resetGame() {
    this.ship = { x: 400, y: 300, angle: 0, radius: 15 };
    this.asteroids = [];
    this.bullets = [];
    this.spawnAsteroids();
    this.startAsteroidGeneration();
  }

  private spawnAsteroids() {
    for (let i = 0; i < 5; i++) {
      this.asteroids.push(new Asteroid(Math.random() * 500, Math.random() * 500, 30, this.asteroidSpeed, Math.random() * Math.PI * 2));
    }
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
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
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
          if(this.puntos % 50 == 0 && this.asteroidTime > 500){
            this.asteroidTime -= 250;
            this.startAsteroidGeneration();
          }
          if(this.puntos % 100 == 0){
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
        this.resetGame();
        break;
      }
    }
  }

  private drawShip() {
    this.ctx.save();
    this.ctx.translate(this.ship.x, this.ship.y);
    this.ctx.rotate(this.ship.angle);
    this.ctx.beginPath();
    this.ctx.moveTo(15, 0);
    this.ctx.lineTo(-15, 10);
    this.ctx.lineTo(-15, -10);
    this.ctx.closePath();
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.restore();
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
}

  class Asteroid {
    constructor(public x: number, public y: number, public radius: number, public speed: number, public angle: number, public color: string | string = "black") {}

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
      ctx.stroke();
    }
  }

  class Bullet {
    constructor(public x: number, public y: number, public angle: number) {}

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

