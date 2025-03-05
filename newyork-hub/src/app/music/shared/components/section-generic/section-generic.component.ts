import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '../../../core/models/tracks.model';
import { CommonModule } from '@angular/common';
import { CardPlayerComponent } from '../card-player/card-player.component';

@Component({
  selector: 'app-section-generic',
  imports: [CommonModule,
            CardPlayerComponent],
  templateUrl: './section-generic.component.html',
  styleUrl: './section-generic.component.scss'
})
export class SectionGenericComponent implements OnInit {
  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<TrackModel> = []

  constructor() { }

  ngOnInit(): void {
  }


}
