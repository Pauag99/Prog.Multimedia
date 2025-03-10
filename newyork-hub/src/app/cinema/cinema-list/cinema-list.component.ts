import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.scss']
})
export class CinemaListComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  duration: string = '0';
  currentTime: string = '0';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    console.log(this.videoElement);
    this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
      this.duration = this.videoElement.nativeElement.duration.toFixed(0);
      this.cdr.detectChanges();
    });

    this.videoElement.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = this.videoElement.nativeElement.currentTime.toFixed(0);
      this.cdr.detectChanges();
    });
  }

  playVideo() {
    this.videoElement.nativeElement.play();
  }

  pauseVideo() {
    this.videoElement.nativeElement.pause();
  }

  stopVideo() {
    this.videoElement.nativeElement.pause();
    this.resetVideo()
  }

  fastForward() {
    this.videoElement.nativeElement.currentTime += 10;
  }

  changeVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.videoElement.nativeElement.volume = parseFloat(input.value);
  }

  toggleFullScreen() {
    if (this.videoElement.nativeElement.requestFullscreen)
      this.videoElement.nativeElement.requestFullscreen();
  }

  resetVideo() {
    this.videoElement.nativeElement.currentTime = 0;
    this.currentTime = this.videoElement.nativeElement.currentTime.toFixed(0);
    this.cdr.detectChanges();
  }

  seekVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.videoElement.nativeElement.currentTime = parseFloat(input.value);
    this.currentTime = this.videoElement.nativeElement.currentTime.toFixed(0);
    this.cdr.detectChanges();
  }
}
