import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() {}

  playSound(soundFile: string): void {
    const audio = new Audio(`assets/sounds/paper`);
    audio.play();
    console.log("audio");
  }
}
