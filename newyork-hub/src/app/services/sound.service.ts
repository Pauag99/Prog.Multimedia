import { Injectable, OnDestroy } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SoundService implements OnDestroy{
  private currentAudio: HTMLAudioElement | null = null;
  private backgroundAudio: HTMLAudioElement | null = null;

  constructor() {}

  playSound(soundFile: string, volume: number | number = 1, delay: number = 0): void {
    setTimeout(() => {
      if(this.currentAudio){
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }
      this.currentAudio = new Audio(`./sounds/` + soundFile);
      this.currentAudio.volume = volume;
      this.currentAudio.play();
    }, delay);
  }

  playBackgroundMusic(soundFile: string, volume: number = 1): void {
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
      this.backgroundAudio.currentTime = 0;
    }
    this.backgroundAudio = new Audio(`./sounds/` + soundFile);
    this.backgroundAudio.volume = volume;
    this.backgroundAudio.loop = true;
    this.backgroundAudio.play();
  }

  stopBackgroundMusic(): void {
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
      this.backgroundAudio.currentTime = 0;
      this.backgroundAudio = null;
    }
  }

  stopSound(): void{
    if(this.currentAudio){
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  ngOnDestroy(): void{
    this.stopSound();
    this.stopBackgroundMusic();
  }
}
