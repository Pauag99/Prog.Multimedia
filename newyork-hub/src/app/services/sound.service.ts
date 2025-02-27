import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() {}

  playSound(soundFile: string, delay: number = 0): void {
    setTimeout(() => {
      const audio = new Audio(`./sounds/` + soundFile);
      audio.play();
    }, delay);
  }
}
