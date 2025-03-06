import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultimediaService } from '../../../services/multimedia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-player',
  imports: [CommonModule],
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.scss'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe((status: string) => this.state = status)
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }


  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x
    const percentageFromX = (clickX * 100) / width
    this.multimediaService.seekAudio(percentageFromX)
  }

  previusTrack(): void {
    this.multimediaService.previousTrack();
  }

  nextTrack(): void{
    this.multimediaService.nextTrack();
  }
}
