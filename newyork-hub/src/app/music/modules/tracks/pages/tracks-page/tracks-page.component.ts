import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TrackModel } from '../../../../core/models/tracks.model';
import { Subscription } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as data from '../../../../data/tracks.json'
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-tracks-page',
  imports: [SectionGenericComponent,
            HttpClientModule],
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    const observer1$ = this.trackService.dataTracks$
    .subscribe(response => {
      this.tracksTrending = response
    })

    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
