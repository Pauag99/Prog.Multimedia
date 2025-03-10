import { TrackModel } from '../core/models/tracks.model';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import * as data from '../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00 ')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject(' -00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)
  private tracks: TrackModel[] = data.data
  public currentTrackIndex: number = 0;

  constructor() {
    this.audio = new Audio()

    this.trackInfo$.subscribe(responseOK => {
      if (responseOK) {
        this.setAudio(responseOK)
      }
    })

    this.listenAllEvents()
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        this.nextTrack()
        break
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage)
  }


  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat)
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = ` -${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  public setAudio(track: TrackModel): void {
    this.currentTrackIndex = Number(track._id)
    if(this.audio){
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.audio.src = track.url
    this.audio.load();
    this.audio.play().catch(error => {
      console.error('Error al reproducir el audio:', error);
    });
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond
  }

  public previousTrack(): void {
    if(this.currentTrackIndex - 1 <= 0)
      this.trackInfo$.next(this.tracks[9])
    else
      this.trackInfo$.next(this.tracks[this.currentTrackIndex - 2])
  }

  public nextTrack(): void {
    if(this.currentTrackIndex + 1 > 10)
      this.trackInfo$.next(this.tracks[0])
    else
      this.trackInfo$.next(this.tracks[this.currentTrackIndex])
  }
}
