import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MediaPlayerComponent } from '../shared/components/media-player/media-player.component';
import { TracksPageComponent } from '../modules/tracks/pages/tracks-page/tracks-page.component';

@Component({
  selector: 'app-musicpage',
  imports: [MediaPlayerComponent,
            RouterOutlet,
            TracksPageComponent],
  templateUrl: './musicpage.component.html',
  styleUrl: './musicpage.component.scss'
})
export class MusicpageComponent {

}
