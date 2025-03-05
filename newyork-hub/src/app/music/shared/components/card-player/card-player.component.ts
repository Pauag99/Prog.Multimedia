import { Component, Directive, Input, OnInit } from '@angular/core';
import { TrackModel } from '../../../core/models/tracks.model';
import { MultimediaService } from '../../../services/multimedia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-player',
  imports: [CommonModule],
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.scss'
})

export class CardPlayerComponent implements OnInit {
  @Input() mode: 'small' | 'big' = 'small'
  @Input() track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  sendPlay(track: TrackModel): void {
    this.multimediaService.trackInfo$.next(track)
  }

}

