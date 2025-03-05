import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrackModel } from '../../../core/models/tracks.model';
import * as data from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})

export class TrackService {
  dataTracks$: Observable<TrackModel[]> = of([])

  constructor(){
    this.dataTracks$ = of(data.data)
  }
}
